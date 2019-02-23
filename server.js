// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var mysql = require("mysql");

// Create an instance of the express app.
var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

var connection = mysql.createConnection(process.env.JAWSDB_URL);

connection.connect( (err)=>{
  if(err) console.log( err );
  console.log(connection.threadId);
});

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Data
var lunches = [
  {
    lunch: "Buffalo chicken pizza"
  }, {
    lunch: "Pizza, two double veggie burgers, fries with a Big Gulp"
  }
];

// Routes
app.get("/weekday", function(req, res) {
  console.log(lunches[0]);
  res.render("index", lunches[0]);
});

app.get("/weekend", function(req, res) {
  res.render("index", lunches[1]);
});

app.get("/lunches", function(req, res) {
  res.render("all-lunches", {
    foods: lunches,
    eater: "david"
  });
});

app.get("/connection-id", function(req, res){
  res.send("connected as " + connection.threadId);
})

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
