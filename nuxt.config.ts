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
    'nuxt-gtag', 
    '@vite-pwa/nuxt',
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
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'SGP1 Companion',
      short_name: 'SGP1',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'android-icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'apple-icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: 'apple-icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    client: {
      installPrompt: true,
      // you don't need to include this: only for testing purposes
      // if enabling periodic sync for update use 1 hour or so (periodicSyncForUpdates: 3600)
      // periodicSyncForUpdates: 20,
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module',
    },
  },

})
