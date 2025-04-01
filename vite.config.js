import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/portfolioWeb/',
  assetsInclude: ['**/*.JPG', '**/*.jpg', '**/*.png', '**/*.webp'],
  plugins: [react()],
})
