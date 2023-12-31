const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const mongoose = require("mongoose");
const posts = require("./posts");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost/blogWeb_db");
const allPosts = posts.find();

app.get("/", function (req, res) {
  res.render("home", {
    posts: allPosts,
  });
});

app.get("/:page", function (req, res) {
  res.render(req.params.page);
});



app.post("/compose", function (req, res) {
  const title = req.body.postTitle;
  const body = req.body.postContent;

  main()
  async function main() {
    console.log("Sucessfully Connected To the Database");

    try {
      const post = await posts.create({
        postTitle: title,
        postContent: body,
      });
      await post.save().then(() => console.log("Successfully Saved"));

      // console.log(allPosts);
      
    } catch (error) {
      console.log(error.message);
    }
  }
  
  res.redirect("/");
});

app.get("/posts/:postitle", function (req, res) {
  const requestedTitle = _.lowerCase(req.params.postitle);

  for (let i = 0; i < posts.length; i++) {
    const storedTitle = _.lowerCase(allPosts[i].postTitle);

    if (requestedTitle === storedTitle) {
      res.render("post", {
        title: allPosts[i].postTitle,
        content: allPosts[i].postContent,
      });
    }
  }
});

app.listen(3000, function () {
  console.log("Server is Running on p-3000");
});
