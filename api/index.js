// const express = require('express')
const axios = require('axios')
const cron = require('node-cron')
// const app = express()

// cron.schedule('* * 23 * Saturday', () => {
cron.schedule('* * * * *', () => {
  axios.get('https://phreezone.africinnovate.xyz/api/resetPvs').then(res => {
    console.log(res)
    console.log('running a task every minute');
  })
})

// app.get('/resetPvs', (req, res) => {
//   res.send('hello world')
// })


module.exports = {
  path: '/api',
  handler: app
}
