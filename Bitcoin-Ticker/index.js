//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const port = 3000;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){

  var cryptocurr = req.body.crypto;
  var moneycurr = req.body.fiat;
  var amount = req.body.amount;

  var baseURL = "https://apiv2.bitcoinaverage.com/convert/global";

  var options = {
    url: baseURL,
    method: "GET",
    qs: {
      from: cryptocurr,
      to: moneycurr,
      amount: amount,
    },
  };
  //console.log(req.body.crypto);
  request(options, function(error, responce, body){
    var data = JSON.parse(body);
    var price = data.price;

    console.log(price);

    var currentDate  = data.time;

    res.write(`<p>The current date is ${currentDate}</p>`);

    res.write(`<h1>${amount} of ${cryptocurr} is currently worth ${price} ${moneycurr}</h1>`);

    res.send();
    //console.log(price);
  });
});

app.listen(port, function(){
  console.log(`the server is running on ${port}`);
});
