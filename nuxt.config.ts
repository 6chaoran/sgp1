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
    '@invictus.codes/nuxt-vuetify',
    'nuxt-gtag'

  ],
  vuetify: {
    /* vuetify options */
    vuetifyOptions: {
      // @TODO: list all vuetify options
    },

    moduleOptions: {
      /* nuxt-vuetify module options */
      treeshaking: true, // | false,
      useIconCDN: true, //| false,

      /* vite-plugin-vuetify options */
      styles: true, //| 'none' | 'expose' | 'sass' | { configFile: string },
      autoImport: true, //| false,
      useVuetifyLabs: true, // | false, 
    }
  },
  gtag: {
    id: 'G-8XTQL3RC8B',
    config: {
      page_title: 'SGP1 Companion'
    }
  }

})
