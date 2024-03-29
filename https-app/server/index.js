import fs from "fs";
import path from "path";
import express from "express";
import https from "https";

const app = express();
const directoryToServe = "build";
const port = 443;

app.use("/", express.static(path.join(__dirname, "..", directoryToServe)));

app.post('/',(req,res)=>{
  var filepath = path.join(__dirname, "..", directoryToServe,'index.html')
  var page =fs.readFileSync(filepath,'utf8')
  res.end(page)
})

const httpsOptions = {
  cert: fs.readFileSync(path.join(__dirname, "ssl", "server.crt")),
  key: fs.readFileSync(path.join(__dirname, "ssl", "server.key"))
};
// app.listen(port)
https.createServer(httpsOptions, app).listen(port, err => {
  if (err) {
    console.log("Server error");
  } else {
    console.log(`Listening on port ${port}`);
  }
});
