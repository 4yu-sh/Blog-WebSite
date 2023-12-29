const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const posts = [];

app.get("/", function (req, res) {
  res.render("home", {
    posts: posts,
  });
});

app.get("/:page", function (req, res) {
  res.render(req.params.page);
});

// app.get("/about",function(req,res){
//     res.render("about")
// });
// app.get("/contact",function(req,res){
//     res.render("contact")
// });
// app.get("/compose",function(req,res){
//     res.render("compose")
// });
// app.get("/post",function(req,res){
//     res.render("post")
// });

app.post("/compose", function (req, res) {
  const title = req.body.postTitle;
  const body = req.body.postContent;

  var post = {
    postTitle: title,
    postContent: body,
  };

  posts.push(post);

  console.log(posts);

  res.redirect("/");
});

app.get("/posts/:postitle", function (req, res) {
  const requestedTitle = _.lowerCase(req.params.postitle);

  for (let i = 0; i < posts.length; i++) {
    const storedTitle = _.lowerCase(posts[i].postTitle);

    if (requestedTitle === storedTitle) {
      res.render("post", {
        title: posts[i].postTitle,
        content: posts[i].postContent,
      });
    }
  }
});

app.listen(3000 || process.env.PORT, function () {
  console.log("Server is Running on p-3000");
});
