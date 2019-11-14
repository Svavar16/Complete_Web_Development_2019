//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash")
const app = express();
const PORT = process.enve.port || 3000
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true, useFindAndModify: false});

const itemsSchema = {
  name: String
}

const Item = mongoose.model("Item", itemsSchema);

  const item1 = new Item({
    name: "Welcome to the todo list"
  });

  const item2 = new Item({
    name: "Hit the + to add a new item"
  });

  const item3 = new Item({
    name: "<-- hit here to delete items."
  });

  const defaultItem = [item1, item2, item3];

const listSchema = {
  name: String,
  items: [ itemsSchema ]
}

const List = mongoose.model("List", listSchema);

app.get("/", function(req, res) {
  Item.find({}, function(err, foundItems){
    if(foundItems === 0){
      Item.insertMany(defaultItem, function(err){
        if(err){
          console.log(err);
        } else {
          console.log("items added");
        }
      });
      res.redirect("/");
    } else {
      res.render("list", {listTitle: "Today", newListItems: foundItems});
      }
  })
});


app.get("/:customListName", function(req, res){
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({name: customListName}, function(err, result){
    if(!err){
      if(!result){
            const list = new List({
              name: customListName,
              items: defaultItem
            })
            list.save();
            res.redirect("/" + customListName)
      } else {
        res.render("list", {listTitle: result.name, newListItems: result.items});
      }
    } else {
      console.log("list not found")
    }
  });
});


app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item ({
    name: itemName
  });

  if(listName === "Today"){
    item.save();

    res.redirect("/");
  } else {
    List.findOne({name: listName}, function(err, foundList){
      foundList.items.push(item);
      foundList.save()
      res.redirect("/" + listName)
    })
  }


});

app.post("/delete", function(req, res){
  const checkedItemID = req.body.checkbox;
  console.log(checkedItemID);
  const listName = req.body.listName;
  console.log(listName);

  if(listName === "Today") {
    Item.findByIdAndRemove(checkedItemID, function(err){
      if(!err){
        console.log("Successfully deleted checked item!")
        res.redirect("/");
      }
    });
  } else {
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemID}}}, function(err, foundList){
      if (!err){
        res.redirect("/" + listName);
      }
    });
  }
});

app.get("/about", function(req, res){
  res.render("about");
})

app.listen(PORT, function() {
  console.log(`Server started on port ${PORT}`);
});
