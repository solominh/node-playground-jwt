// This is your Editor pane. Write your JavaScript here and
// use the command line to execute commands
// Load in our dependencies
var express = require("express");
var jwt = require("jsonwebtoken");
var cookieParser = require("cookie-parser");

var app = express();
app.use(cookieParser());

  // Register the home route that displays a welcome message
// This route can be accessed without a token
app.get("/", function(req, res) {
  res.send("Welcome to our API");
});

// Register the route to get a new token
// In a real world scenario we would authenticate user credentials
// before creating a token, but for simplicity accessing this route
// will generate a new token that is valid for 2 minutes
app.get("/token", function(req, res) {
  var token = jwt.sign({ username: "ado" }, "supersecret", { expiresIn: 120 });
  res.setHeader("Set-Cookie", [`access-token=${token}`]);
  res.send(token);
});

// Register a route that requires a valid token to view data
app.get("/api", function(req, res) {
  var token = req.cookies["access-token"];
  jwt.verify(token, "supersecret", function(err, decoded) {
    if (!err) {
      var secrets = {
        accountNumber: "938291239",
        pin: "11289",
        account: "Finance"
      };
      res.json(secrets);
    } else {
      res.send(err);
    }
  });
});

// Launch our app on port 3000
app.listen("3000");
