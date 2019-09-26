const express = require('express')
const fileUpload = require('express-fileupload')
const app = express()
const port = 80

const page = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
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
  </body>
</html>
`
app.use(fileUpload())

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send(page)
})

app.post('/upload', function(req, res) {
  console.log(req.files) // the uploaded file object

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

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
