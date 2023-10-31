const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Initial array to store blog posts
const posts = [];

app.get('/', (req, res) => {
    res.render('home', { posts });
});

app.get('/add', (req, res) => {
    res.render('add');
});

app.post('/add', (req, res) => {
    const { title, description } = req.body;
    const date = new Date().toLocaleDateString();
    const newPost = { title, description, date };
    posts.push(newPost);
    res.redirect('/');
});


// ...
app.get('/readmore/:id', (req, res) => {
    const postId = req.params.id;
    if (posts[postId]) {
        res.render('readmore', { post: posts[postId] });
    } else {
        res.status(404).send('Post not found');
    }
});
// ...
// ...
app.post('/edit/:id', (req, res) => {
    const postId = req.params.id;
    if (posts[postId]) {
        const { title, description } = req.body;
        posts[postId].title = title;
        posts[postId].description = description;
        res.redirect('/');
    } else {
        res.status(404).send('Post not found');
    }
});
// ...
// ...
app.get('/edit/:id', (req, res) => {
    const postId = req.params.id;
    if (posts[postId]) {
        res.render('edit', { post: posts[postId], postId });
    } else {
        res.status(404).send('Post not found');
    }
});
// ...

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
