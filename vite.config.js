import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base:"/iTask---A-Todo-List-App/",
  plugins: [react()],
})
