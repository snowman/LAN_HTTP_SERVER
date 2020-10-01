const page = props => `
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
    <label for="uploaded_file">UPLOADED FILE:</label>
    <a href="./UPLOADED_FILE">UPLOADED_FILE</a>
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
`;

module.exports = { renderPage: page };
