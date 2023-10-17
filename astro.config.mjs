import { defineConfig } from 'astro/config'
import vercel from '@astrojs/vercel/serverless'


// https://astro.build/config
import react from '@astrojs/react'

// https://astro.build/config

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  output: 'server',
  adapter: vercel(
    {
      analytics: true
    }
  )
})
