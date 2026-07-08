import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return undefined
          }

          if (id.includes('react-icons')) {
            return 'icons'
          }

          if (id.includes('framer-motion') || id.includes('gsap')) {
            return 'motion'
          }

          if (id.includes('@tsparticles') || id.includes('tsparticles')) {
            return 'particles'
          }

          if (id.includes('react') || id.includes('react-dom')) {
            return 'react'
          }

          return 'vendor'
        },
      },
    },
  },
  plugins: [react(), tailwindcss()],
})
