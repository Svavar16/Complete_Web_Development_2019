//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const port = 3000;

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
  var firstName = req.body.fName;
  var secondName = req.body.sName;
  var email = req.body.eMail;

  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: secondName,
      }
    }]
  };

  var jsonData = JSON.stringify(data);

  var options = {
      url: 'https://us3.api.mailchimp.com/3.0/lists/42881a1aaf',
      method: 'POST',
      headers: {
        "Authorization": "Svavar1 19931052ae11dc1d3f53368718ac1e68-us3"
      },
      body: jsonData
  };

  request(options, function(error, responce, body){
      if(error){
        res.sendFile(__dirname + "/failure.html");
        console.log(error);
      } else {
        if (responce.statusCode === 200){
        res.sendFile(__dirname  + "/success.html");
        console.log(responce.statusCode);
      } else {
          res.sendFile(__dirname + "/failure.html");
          console.log(responce.statusCode);
        }
      }
  });

});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(port, function(){
  console.log(`Server is now running on port ${port}`);
});

// Mailchimp api key
//19931052ae11dc1d3f53368718ac1e68-us3
// list id
// 42881a1aaf
