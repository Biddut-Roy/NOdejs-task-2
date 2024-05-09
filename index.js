const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Dummy data for posts
let posts = [
    { id: 1, text: 'Post 1', likes: 0, comments: [] },
    { id: 2, text: 'Post 2', likes: 0, comments: [] }
];

// Get all posts
app.get('/posts', (req, res) => {
    res.json(posts);
});




// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});