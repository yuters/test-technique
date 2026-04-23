// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/eslint'],
  runtimeConfig: {
    backendBaseUrl: process.env.NUXT_BACKEND_BASE_URL || 'http://localhost:8000',
  },
})
