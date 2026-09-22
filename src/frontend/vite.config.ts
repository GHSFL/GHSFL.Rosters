import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Served from https://ghsfl.github.io/GHSFL.Rosters/ in production, so asset
// URLs need the repo name as a base path. Dev server stays at the root.
// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/GHSFL.Rosters/' : '/',
  plugins: [react()],
}))
