export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Phreezone',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    'assets/css/bootstrap.css',
    'assets/css/all.css',
    'assets/css/style.css',
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/is-admin',
    '@/plugins/currency',
    '@/plugins/ant-design-vue'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxtjs/date-fns',
    '@nuxtjs/ngrok',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/auth/login', method: 'post', propertyName: 'access_token' },
          logout: { url: '/auth/logout', method: 'post' },
          user: { url: '/auth/user-profile', method: 'get', propertyName: 'data'}
        },
        // tokenRequired: true,
        // tokenType: 'bearer',
        // globalToken: true,
        // autoFetchUser: true
      }
    },

    redirect: {
      login: '/',
      logout: '/',
      // callback: '/login',
      home: '/home'
    }
  },
  axios: {
    baseURL: process.env.NODE_ENV === 'dev'
      ? 'http://localhost:8000/api/'
      : 'http://167.172.149.121/mlm-api/api/'
  },
  publicRuntimeConfig: {
    imagePath: process.env.NODE_ENV === 'dev'
      ? 'http://localhost:8000'
      : 'http://167.172.149.121',
  },
  router: {
    middleware: ['auth']
  },
  build: {
  }
}
