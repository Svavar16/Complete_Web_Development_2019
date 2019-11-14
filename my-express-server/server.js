//jshint esversion:6

const express = require("express");
const app = express();
const port = 3000;

app.get("/", function(request, responce){
  responce.send("<h1>Hello, World!</h1>");
});

app.get("/contact", function(req, res) {
  res.send("contact me!");
});

app.get("/about", function(req, res){
  res.send("My name is Svavar!");
});

app.listen(port, function(){
  console.log(`Server started on port ${port}`);
});
