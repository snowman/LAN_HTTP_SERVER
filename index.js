const express = require('express')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const fs = require('fs')
const chalk = require('chalk')
const moment = require('moment')
const app = express()
const PORT = 80

const page = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <style>
      h1 {
        margin: 0;
      }

      .container {
        margin-bottom: 1em;
      }
    </style>
  </head>
  <body>
    <div class="container" id="upload">
      <h1>Upload</h1>
      <form
        ref="uploadForm"
        id="uploadForm"
        action="/upload"
        method="post"
        encType="multipart/form-data"
      >
        <input type="file" name="UPLOADING_FILE" />
        <input type="submit" value="Upload!" />
      </form>
    </div>
    <div class="container" id="pastebin">
      <h1>Pastebin</h1>

      <form id="pasteForm" action="/pastebin" method="post">
        <textarea
          name="PASTE"
          cols="50"
          rows="10"
          placeholder="Paste your content here"
        ></textarea>
        <br />
        <input type="submit" value="Upload!" />
      </form>
    </div>
  </body>
</html>
`

const log = console.log
const withColor = color => text => chalk[color](text)
const withNowTime = text =>
  chalk['cyan'](moment().format('YYYY/MM/DD h:mm:ss A ')) + text

app.use(fileUpload())
app.use(bodyParser.urlencoded({ extended: false }))

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send(page)
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

app.listen(PORT, () =>
  log(`Example app listening on port ${withColor('red')(PORT)}`)
)
