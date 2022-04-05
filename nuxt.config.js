export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Helmi Wartek Pokedex',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Welcome to Helmi Wartek Pokedex',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/db', ssr: false },
    { src: '~/plugins/vue-infinite-scroll', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/composition-api/module',
    '@pinia/nuxt',
  ],

  tailwindcss: {
    jit: true,
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: 'Pokedex',
      display: 'standalone',
      lang: 'en',
    },
    icon: {
      source: '/icon.png',
      sizes: [64, 120, 144, 152, 192, 384, 512],
      // The user agent is free to display the icon in any context.
      purpose: 'any',
    },
    workbox: {
      enabled: true,
      config: { debug: true },
      runtimeCaching: [
        {
          urlPattern:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/.*',
          handler: 'NetworkFirst',
          method: 'GET',
          strategyOptions: { cacheableResponse: { statuses: [200] } },
        },
      ],
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
