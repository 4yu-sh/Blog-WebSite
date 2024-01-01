const mongoose = require("mongoose");
const posts = require("./posts");

mongoose.connect("mongodb://localhost/blogWeb_db").then(main());


async function main(){
    console.log("Sucessfully Connected To the Database");

    try {
        const post = await posts.create({
            _id: 7,
            postTitle: "Day 100",
            postContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        })
        await post.save().then(()=> console.log("Successfully Saved"));

        // const allPosts = await posts.find();
        // console.log(allPosts);
        
    } catch (error) {
        console.log(error.message);
    }
}
