const express = require('express')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const fs = require('fs')
const chalk = require('chalk')
const moment = require('moment')
const app = express()
const { get_lan_ip } = require('./Get_LAN_IP')
const { renderPage } = require('./page')
const PORT = 8888

const log = console.log
const withColor = color => text => chalk[color](text)
const withNowTime = text =>
  chalk['cyan'](moment().format('YYYY/MM/DD h:mm:ss A ')) + text

// middleware
app.use(fileUpload())
app.use(bodyParser.urlencoded({ extended: false }))

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send(renderPage({}))
})

// respond with "hello world" when a GET request is made to the homepage
app.get('/UPLOADED_FILE', function(req, res) {
  res.sendFile(__dirname + '/UPLOADED_FILE')
})

app.post('/upload', function(req, res) {
  log(withNowTime(withColor('yellow')(req.files))) // the uploaded file object

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.')
  }

  // The name of the input field (i.e. "UPLOADING_FILE") is used to retrieve the uploaded file
  let UPLOADING_FILE = req.files.UPLOADING_FILE

  // Use the mv() method to place the file somewhere on your server
  UPLOADING_FILE.mv('./UPLOADED_FILE', function(err) {
    if (err) return res.status(500).send(err)

    res.send('File uploaded!')
  })
})

app.post('/pastebin', function(req, res) {
  log(withNowTime(withColor('redBright')(`Requesting pastebin service`)))

  const pastebin = req.body.PASTE

  fs.writeFileSync('./PASTE_BIN', pastebin)

  res.send(`Your post: <br /><br /><pre>${pastebin}</pre>`)
})

app.listen(PORT, () => {
  log(
    `Example app listening on port ${withColor('yellow')(
      get_lan_ip()
    )}:${withColor('red')(PORT)}`
  )
})
