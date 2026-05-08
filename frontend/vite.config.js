import { defineConfig } from 'vite'
import tailwindcss from "@tailwindcss/vite";
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  server: {
    port: 5000,
    host: true,
    open: true,
    cors: true,
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
})
