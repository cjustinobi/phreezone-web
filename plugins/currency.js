import Vue from 'vue'

Vue.filter('currency', function (val) {
  if (!val) return ''
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NGN'
  }).format(val).replace('NGN', '₦')
})
