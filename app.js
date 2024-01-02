const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const mongoose = require("mongoose");
const Posts = require("./posts");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb://localhost/blogWeb_db");

app.get("/", async (req, res) => {
  const posts = await Posts.find();
  res.render("home", { posts });
});

app.get("/:page", function (req, res) {
  res.render(req.params.page);
});


app.post("/compose", function (req, res) {
  const title = req.body.postTitle;
  const body = req.body.postContent;

  main();

  async function main() {
    console.log("Sucessfully Connected To the Database");

    try {
      const post = await Posts.create({
        postTitle: title,
        postContent: body,
      });
      await post.save().then(() => console.log("Successfully Saved"));
    } catch (error) {
      console.log(error.message);
    }
  }

  res.redirect("/");
});

app.get("/posts/:postitle", function (req, res) {
  const requestedTitle = _.lowerCase(req.params.postitle);
  readMore()
  async function readMore() {
    const allPosts = await Posts.find();
  
    for (let i = 0; i < allPosts.length; i++) {
      const storedTitle = _.lowerCase(allPosts[i].postTitle);
      console.log(storedTitle);

      if (requestedTitle === storedTitle) {
        res.render("post", {
          title: allPosts[i].postTitle,
          content: allPosts[i].postContent,
        });
      }
    }
  }
});

app.listen(3000 || process.env.PORT, function () {

  console.log("Server is Running on p-3000");
});
