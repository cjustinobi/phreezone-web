export default {

  ssr: false,

  head: {
    title: 'Phreezone',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: 'vendor/jquery/jquery.min.js' },
      {  src: 'vendor/bootstrap/js/bootstrap.bundle.min.js' },
      {  src: 'vendor/jquery.easing/jquery.easing.min.js' },
      {  src: 'vendor/isotope-layout/isotope.pkgd.min.js' },
      {  src: 'vendor/venobox/venobox.min.js' },
      {  src: 'vendor/aos/aos.js' },
      {  src: 'vendor/js/main.js' },
      {  src: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.32/pdfmake.min.js' },
      {  src: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.32/vfs_fonts.js' },
    ]
  },

  css: [
    'assets/css/bootstrap.css',
    'assets/css/all.css',
    'assets/css/style.css',
  ],

  plugins: [
    '@/plugins/excel',
    '@/plugins/helper',
    '@/plugins/currency',
    '@/plugins/ant-design-vue',
    '@/plugins/vue-quill-editor'
  ],

  components: true,

  serverMiddleware: ['~/api/index.js'],

  buildModules: [
    '@nuxtjs/date-fns'
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/cloudinary'
  ],

  cloudinary: {
    cloudName: 'africinnovate-technology',
    apiKey: process.env.CLOUDINARY_KEY,
    apiSecret: process.env.CLOUDINARY_SECRET
  },

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
      login: '/login',
      logout: '/',
      // callback: '/login',
      home: '/home'
    }
  },
  axios: {
    baseURL: process.env.NODE_ENV === 'dev'
      ? 'http://localhost:8000/api/'
      : 'https://phreezone.africinnovate.xyz/api/'
  },
  publicRuntimeConfig: {
    imagePath: process.env.NODE_ENV === 'dev'
      ? 'http://localhost:8000'
      : 'https://phreezone.africinnovate.xyz',
  },
  router: {
    middleware: ['auth']
  },
  build: {
  }
}
