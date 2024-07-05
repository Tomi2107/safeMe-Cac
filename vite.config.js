import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { config } from 'dotenv'

config();

const port = process.env.APP_PORT || 4000;
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: port,
    strictPort: true,
    host: '0.0.0.0',
  },
})
