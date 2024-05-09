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
  




// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});