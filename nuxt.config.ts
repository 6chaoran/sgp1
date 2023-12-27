// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public:{
      supabaseKey: process.env.NUXT_SUPABASE_KEY,
      supabaseUrl: process.env.NUXT_SUPABASE_URL,
    }
  },
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
  ],

})
