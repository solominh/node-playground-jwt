import fs from "fs";
import path from "path";
import express from "express";
import https from "https";

const app = express();
const directoryToServe = "client";
const port = 443;

app.use("/", express.static(path.join(__dirname, "..", directoryToServe)));

app.get('/',(req,res)=>{
  res.send('Hello')
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
