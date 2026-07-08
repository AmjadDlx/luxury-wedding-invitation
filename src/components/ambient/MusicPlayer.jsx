import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Howl } from 'howler'
import { FiPause, FiPlay, FiVolumeX } from 'react-icons/fi'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion'

const storageKey = 'wedding-audio-preference'
const fadeDuration = 900
const synthNotes = [261.63, 329.63, 392, 523.25, 440, 392, 329.63, 293.66]

function getStoredPreference() {
  try {
    return window.localStorage.getItem(storageKey)
  } catch {
    return null
  }
}

function setStoredPreference(preference) {
  try {
    window.localStorage.setItem(storageKey, preference)
  } catch {
    // localStorage can be unavailable in private browsing; audio still works.
  }
}

function createFallbackMusic() {
  const AudioContext = window.AudioContext || window.webkitAudioContext

  if (!AudioContext) {
    return null
  }

  const context = new AudioContext()
  const master = context.createGain()
  const state = {
    currentVolume: 0,
    intervalId: 0,
    muted: false,
    noteIndex: 0,
    playing: false,
    targetVolume: 0,
  }

  master.gain.value = 0
  master.connect(context.destination)

  const playNote = () => {
    if (!state.playing || state.muted) {
      return
    }

    const now = context.currentTime
    const oscillator = context.createOscillator()
    const noteGain = context.createGain()
    const frequency = synthNotes[state.noteIndex % synthNotes.length]

    state.noteIndex += 1
    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(frequency, now)
    noteGain.gain.setValueAtTime(0.0001, now)
    noteGain.gain.exponentialRampToValueAtTime(0.32, now + 0.08)
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.25)
    oscillator.connect(noteGain)
    noteGain.connect(master)
    oscillator.start(now)
    oscillator.stop(now + 1.35)
  }

  const setVolume = (volume, duration = 0.01) => {
    state.currentVolume = volume
    master.gain.cancelScheduledValues(context.currentTime)
    master.gain.setTargetAtTime(volume, context.currentTime, Math.max(duration / 3000, 0.01))
  }

  return {
    fade: (_from, to, duration) => setVolume(to, duration),
    mute: (shouldMute) => {
      state.muted = shouldMute
      setVolume(shouldMute ? 0 : state.targetVolume, 120)
    },
    pause: () => {
      state.playing = false
      window.clearInterval(state.intervalId)
      state.intervalId = 0
      setVolume(0, 180)
    },
    play: () => {
      context.resume()
      state.playing = true

      if (!state.intervalId) {
        playNote()
        state.intervalId = window.setInterval(playNote, 1350)
      }
    },
    playing: () => state.playing,
    unload: () => {
      window.clearInterval(state.intervalId)
      context.close()
    },
    volume: (volume) => {
      if (typeof volume === 'number') {
        state.targetVolume = volume
        setVolume(volume, 120)
      }

      return state.currentVolume
    },
  }
}

function MusicPlayer({ audio }) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const howlRef = useRef(null)
  const reducedMotionRef = useRef(prefersReducedMotion)
  const stateRef = useRef('paused')
  const pauseTimerRef = useRef(0)
  const fallbackRef = useRef(null)
  const [audioState, setAudioState] = useState('paused')
  const isEnabled = Boolean(audio?.enabled)

  const buttonCopy = useMemo(
    () => ({
      muted: 'Music muted',
      paused: 'Play music',
      playing: 'Pause music',
    }),
    [],
  )

  useEffect(() => {
    stateRef.current = audioState
  }, [audioState])

  useEffect(() => {
    reducedMotionRef.current = prefersReducedMotion
  }, [prefersReducedMotion])

  const clearPauseTimer = useCallback(() => {
    if (pauseTimerRef.current) {
      window.clearTimeout(pauseTimerRef.current)
      pauseTimerRef.current = 0
    }
  }, [])

  useEffect(() => {
    if (!isEnabled) {
      return undefined
    }

    const startFallback = () => {
      if (!fallbackRef.current) {
        fallbackRef.current = createFallbackMusic()
      }

      const fallback = fallbackRef.current

      if (fallback && stateRef.current === 'playing') {
        howlRef.current = fallback
        fallback.play()
        fallback.fade(0, audio.volume, fadeDuration)
      }
    }

    const sound = audio.track
      ? new Howl({
          html5: true,
          loop: true,
          onloaderror: startFallback,
          onplayerror: startFallback,
          src: [audio.track],
          volume: 0,
        })
      : createFallbackMusic()

    howlRef.current = sound

    const preference = getStoredPreference()

    if (preference === 'muted') {
      sound.mute(true)
      setAudioState('muted')
    } else if (audio.autoplay && !reducedMotionRef.current && preference === 'playing') {
      sound.play()
      sound.fade(0, audio.volume, fadeDuration)
      setAudioState('playing')
    }

    const handleVisibilityChange = () => {
      if (document.hidden && sound.playing()) {
        clearPauseTimer()
        sound.fade(sound.volume(), 0, fadeDuration)
      } else if (!document.hidden && stateRef.current === 'playing') {
        clearPauseTimer()
        if (!sound.playing()) {
          sound.play()
        }
        sound.fade(sound.volume(), audio.volume, fadeDuration)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      clearPauseTimer()
      sound.unload()
      fallbackRef.current?.unload()
      howlRef.current = null
      fallbackRef.current = null
    }
  }, [audio.autoplay, audio.track, audio.volume, clearPauseTimer, isEnabled])

  const handleToggle = useCallback(() => {
    const sound = howlRef.current

    if (!sound) {
      return
    }

    if (audioState === 'playing') {
      clearPauseTimer()
      sound.fade(sound.volume(), 0, fadeDuration)
      pauseTimerRef.current = window.setTimeout(() => {
        pauseTimerRef.current = 0

        if (howlRef.current === sound && stateRef.current === 'paused') {
          sound.pause()
        }
      }, fadeDuration)
      setAudioState('paused')
      setStoredPreference('paused')
      return
    }

    clearPauseTimer()
    sound.mute(false)

    if (!sound.playing()) {
      sound.play()
    }

    sound.fade(0, audio.volume, fadeDuration)
    setAudioState('playing')
    setStoredPreference('playing')
  }, [audio.volume, audioState, clearPauseTimer])

  const handleMute = useCallback(() => {
    const sound = howlRef.current

    if (!sound) {
      return
    }

    clearPauseTimer()
    sound.mute(true)
    sound.pause()
    setAudioState('muted')
    setStoredPreference('muted')
  }, [clearPauseTimer])

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key.toLowerCase() === 'm') {
        event.preventDefault()

        if (audioState === 'muted') {
          handleToggle()
        } else {
          handleMute()
        }
      }
    },
    [audioState, handleMute, handleToggle],
  )

  if (!isEnabled) {
    return null
  }

  const Icon = audioState === 'playing' ? FiPause : audioState === 'muted' ? FiVolumeX : FiPlay

  return (
    <div className="music-control-wrap">
      <button
        aria-label={buttonCopy[audioState]}
        aria-keyshortcuts="M"
        className="music-control"
        data-state={audioState}
        onClick={handleToggle}
        onContextMenu={(event) => {
          event.preventDefault()
          handleMute()
        }}
        onKeyDown={handleKeyDown}
        title="Click to play or pause. Press M to mute."
        type="button"
      >
        <Icon aria-hidden="true" />
      </button>
    </div>
  )
}

export default memo(MusicPlayer)
