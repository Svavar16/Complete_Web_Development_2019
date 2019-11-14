//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require('ejs');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000

const app = express();

app.set('view engine', ejs);

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});

const articleSchema = {
  title: String,
  content: String
}

const article = mongoose.model("article", articleSchema);

// get all articles

app.route("/articles")
  .get(function(req, res){
    article.find({}, function(err, result){
        res.send(result)
    });
  })

  .post(function(req, res){
    const newArticle = new article ({
      title: req.body.title,
      content: req.body.content
    });

    newArticle.save(function(err){
      if(!err){
        res.send("Successfully added a new article")
      } else {
        res.send(err);
      }
    });
  })

  .delete(function(req, res){
    article.deleteMany(function(err){
      if(!err){
        res.send("Everything was deleted");
      } else {
        res.send(err);
      }
    });
  });

// get a specific article

app.route("/articles/:articlesTitle")
  .get(function(req, res){
    article.findOne({title: req.params.articlesTitle}, function(err, foundArticle){
      if(!err){
        res.send(foundArticle);
      } else {
        res.send(err);
      }
    });
  })
  .put(function(req, res){
    article.update(
      {title: req.params.articlesTitle},
      {title: req.body.title, content: req.body.content},
      {overwrite: true},
      function(err){
        if(!err){
          res.send("Successfully updated article");
        } else {
          res.send(err);
        }
      }
    );
  })
  .patch(function(req, res){
    article.update(
      {title : req.params.articlesTitle},
      {$set: req.body},
      function(err){
        if(!err){
          res.send("Successfully updated article");
        } else {
          res.send(err);
        }
      }
    );
  })
  .delete(function(req, res){
    article.deleteOne({title: req.params.articlesTitle}, function(err){
      if(!err){
        res.send("Successfully deleted an article");
      } else {
        res.send(err);
      }
    })

  })

app.listen(PORT,() => {
  console.log(`Server is active on port ${PORT}`);
})
