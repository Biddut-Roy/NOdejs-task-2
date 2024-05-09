const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Dummy data 
let posts = [
    { id: 1, text: 'Post 1', likes: 0, comments: [] },
    { id: 2, text: 'Post 2', likes: 0, comments: [] }
];

// Get all posts
app.get('/posts', (req, res) => {
    res.json(posts);
});


// Access a get data by ID 
app.get('/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(post => post.id === postId);
    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
});


// Create a new post
app.post('/posts', (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ message: 'Text is required' });
    }
    const newPost = {
        id: posts.length + 1,
        text,
        likes: 0,
        comments: []
    };
    posts.push(newPost);
    res.status(201).json(newPost);
});


// Like a post by ID
app.post('/posts/:id/like', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(post => post.id === postId);
    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }
    post.likes++;
    res.json(post);
});

// Add a comment to a post by Id
app.post('/posts/:id/comments', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(post => post.id === postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: 'Text is required' });
    }
    const newComment = {
      text
    };
    post.comments.push(newComment);
    res.status(201).json(post.comments);
  });



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});