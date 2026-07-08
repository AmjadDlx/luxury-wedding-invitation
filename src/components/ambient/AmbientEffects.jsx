import { memo, useEffect } from 'react'
import AmbientLighting from './AmbientLighting'
import CursorTrail from './CursorTrail'
import FloatingPetals from './FloatingPetals'
import MusicPlayer from './MusicPlayer'
import ScrollProgress from './ScrollProgress'
import useWeddingContent from '../../context/useWeddingContent'

function AmbientEffects() {
  const { content: weddingData } = useWeddingContent()
  useEffect(() => {
    const main = document.querySelector('main')
    const observedSections = new Set()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-section-active', entry.isIntersecting)
        })
      },
      { rootMargin: '-28% 0px -46% 0px', threshold: 0 },
    )

    const observeSections = () => {
      document.querySelectorAll('main > section').forEach((section) => {
        if (!observedSections.has(section)) {
          observedSections.add(section)
          observer.observe(section)
        }
      })
    }

    const mutationObserver = new MutationObserver(observeSections)

    observeSections()

    if (main) {
      mutationObserver.observe(main, { childList: true, subtree: false })
    }

    return () => {
      mutationObserver.disconnect()
      observer.disconnect()
      observedSections.clear()
    }
  }, [])

  return (
    <>
      <ScrollProgress />
      <AmbientLighting />
      <FloatingPetals />
      <CursorTrail />
      <MusicPlayer audio={weddingData.audio} />
    </>
  )
}

export default memo(AmbientEffects)
