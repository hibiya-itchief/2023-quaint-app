import colors from 'vuetify/es5/util/colors'

const environment = process.env.QUAINT_ENV || 'development'
const envSet = require(`./env.${environment}.js`)

export default {
  ssr: false,
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - quaint-app',
    title: 'quaint-app',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // cross-env
  env: envSet,

  router: {
    base: '/',
    middleware: ['auth'],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    // https://auth.nuxtjs.org/
    '@nuxtjs/auth-next',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: envSet.BASEURL,
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  auth: {
    watchLoggedIn: true,
    token: {
      prefix: '_token.',
      global: true,
    },
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/callback',
      home: '/',
    },
    strategies: {
      b2c: {
        scheme: 'oauth2',
        clientId: envSet.AZURE_B2C_CLIENTID,
        endpoints: {
          authorization: envSet.AZURE_B2C_ENDPOINT_AUTHORIZATION,
          token: envSet.AZURE_B2C_ENDPOINT_TOKEN,
          userInfo: undefined,
          logout: envSet.AZURE_B2C_ENDPOINT_LOGOUT,
        },
        // ライブラリはthis.option.tokenで読んでるからここは絶対に"token"
        token: {
          property: 'id_token', // ここは /tokenエンドポイントをたたいた時に返ってくるjsonに合わせる
          type: 'Bearer',
          maxAge: 1800,
        },
        // ライブラリはthis.option.refreshTokenで読んでるからここは絶対に"refreshToken"
        refreshToken: {
          property: 'refresh_token',
          maxAge: 60 * 60 * 24 * 60,
        },
        responseType: 'code',
        grantType: 'authorization_code',
        accessType: 'offline',
        codeChallengeMethod: 'S256',
        scope: ['openid', 'profile', 'offline_access'],
      },
      ad: {
        scheme: 'openIDConnect',
        clientId: envSet.AZURE_AD_CLIENTID, // seiryofes.onmicrosoft.com
        endpoints: {
          configuration: envSet.AZURE_AD_OPENIDCONFIGURATION,
        },
        token: {
          property: 'id_token',
          maxAge: 60 * 60 * 24 * 30,
          type: 'Bearer',
          prefix: '_id_token.',
          expirationPrefix: '_id_token_expiration.',
        },
        responseType: 'code',
        grantType: 'authorization_code',
        scope: ['openid', 'profile', 'offline_access'],
        codeChallengeMethod: 'S256',
      },
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['defu'],
  },
}
