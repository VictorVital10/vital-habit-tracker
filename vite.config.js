import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// GitHub Pages serves the built app from /vital-habit-tracker/, not domain
// root — but keep the plain dev server at "/" so npm run dev stays simple.
// NOTE: Vite reports command:'serve' for both `vite dev` AND `vite preview`,
// so branching on `command` alone would make `npm run preview` serve the
// subpath-built dist/ at root and 404 every asset. Use the npm script name
// instead to tell dev apart from preview.
const isPlainDev = process.env.npm_lifecycle_event !== 'preview'

export default defineConfig(({ command }) => ({
  base: command === 'build' || !isPlainDev ? '/vital-habit-tracker/' : '/',
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/*.png'],
      manifest: {
        name: 'Vital',
        short_name: 'Vital',
        description: 'Saúde, treinos e bons hábitos',
        lang: 'pt-BR',
        start_url: '.',
        scope: '.',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#06111b',
        theme_color: '#06111b',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'icons/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Precache the whole built app shell so it opens instantly offline.
        globPatterns: ['**/*.{js,css,html,png,svg}'],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
}))
