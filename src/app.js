const exp = require("constants");
const express = require("express");
const app = express();
const path = require("path");
// HERE WE USED EXPRESS TO MAKE HHTPS REQUEST.

const publicDirectoryPath = path.join(__dirname, "../public");
app.use(express.static(publicDirectoryPath));

app.listen(3000, () => {
  console.log("Server is up and running on port 3000!");
});
