//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const port = 3000;

const app = express();

let items = [];
let workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get("/", function(req, res) {

 let day = date.getDate();


  res.render("list", {
    listTitle: day,
    newListItem: items
  });
})

app.get("/work", function(req, res){
  res.render("list", {listTitle: "Work list", newListItem: workItems})
});

app.post("/", function(req, res) {
  let item = req.body.InsertVal;

  if(req.body.list === "work"){
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);

    res.redirect("/");
  }
});


app.post("/work", function(req, res){
  let item = req.body.InsertVal;
  workItems.push(item);
  res.redirect("/work");
});

app.get("/about", function(req, res){
  res.render("about");
});


app.listen(port, function() {
  console.log(`server is active on port ${port}`);
})
