import { defineConfig } from 'vite'
import pug from 'vite-plugin-pug'

export default defineConfig({
  plugins: [pug()],
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname,
      '@views': new URL('./views', import.meta.url).pathname,
    },
  },
})
