const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Post = require('./models/post')

const app = express();

mongoose.connect("mongodb+srv://snsinghi:zHiDmrWWhnpyPBam@cluster0.cmion.mongodb.net/node-angular?retryWrites=true&w=majority")
  .then(() =>{
    console.log("Connected To Database")
  })
  .catch(() =>{
    console.log("Connection Failed")
  })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers',
                "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Methods', "GET, POST, PATCH, DELETE, OPTIONS");
  next();
})

app.post("/api/posts", (req,res,next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  })
  post.save();
  res.status(201).json({
    message: "Post Added Successfully!"
  })
});

app.get('/api/posts',(req,res,next) => {
  Post.find()
    .then(documents => {
      res.status(200).json({
        message: 'Posts Fetched Successfully!',
        posts: documents
      });
    });
});

app.delete("api/posts/:id", (req,res,next) => {
  console.log(req.params.id);
  res.status(200).json({
    message: "Post Deleted!"
  });
});

module.exports = app;
