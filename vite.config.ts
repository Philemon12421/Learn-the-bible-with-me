import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// inside defineConfig({ plugins: [ react(), /* ...your other plugins */,
VitePWA({
  registerType: 'autoUpdate',
  manifest: false, // you already maintain Manifest.json yourself — see below
  includeAssets: ['cross.jpeg', 'icons/*.png'],
  workbox: {
    globPatterns: ['**/*.{js,css,html,ico,png,svg,jpeg}'],
    navigateFallback: '/index.html',
  },
})
// ] })
export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
