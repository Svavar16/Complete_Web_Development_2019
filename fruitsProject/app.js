//jshint esversion: 6

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true })

const fruitsSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: [true, 'Your fruit needs a name!']
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
})

const Fruit = mongoose.model("Fruit", fruitsSchema);

const fruit = new Fruit ({
  name: "Pear",
  rating: 7,
  review: "Good fruit"
});

//fruit.save();

const peopleSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFruit: fruitsSchema
})

const People = mongoose.model("People", peopleSchema);
/*
const people = new People ({
  name: "John",
  age: 37,
  favoriteFruit: Pear
});

people.save();
*/
People.updateOne({name: "John"}, {favoriteFruit: fruit}, function(err){
  if(err){
    console.log(err);
  } else {
    console.log("Success");
  }
})

Fruit.find(function(err, fruits){
  if(err){
    console.log(err);
  } else {

    mongoose.connection.close();
    fruits.forEach(function(fruit){
      console.log(fruit);
    })
  }
})
/*
Fruit.updateOne({_id: "5d1b508afb6a01798c323f1e"}, {name: "Peach"}, function(err){
  if(err){
    console.log(err);
  } else {
    console.log("Success");
  }
});

Fruit.deleteOne({_id: "5d1aa2be0cf24a63fc7fa013"},function(err){
  if(err){
    console.log(err);
  } else {
    console.log("successfully deleted the record");
  }
});

People.deleteMany({name: "John"}, function(err){
  if(err){
    console.log(err);
  } else {
    console.log("all deleted!")
  }
});
*/
