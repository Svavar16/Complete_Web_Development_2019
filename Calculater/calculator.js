//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

const port = 3000;

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.get("/bmiCalculator", function(req, res){
  res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/", function(req, res){

  var num1 = Number(req.body.num1);
  var num2 = Number(req.body.num2);

  var result = num1 + num2;
  res.send('The result of is: ' + result);
});

app.post("/bmiCalculator", function(req, res){
  var height = Number(req.body.Height);
  var weight = Number(req.body.Weight);

  var result = weight / (height*height);
  res.send('Your BMI is ' + result);
});

app.listen(port, function(){
  console.log(`The server is running on port ${port}`);
});
