const express = require('express');
const posts = require('./posts');
const tags = require('./tags');

const app = express();

app.use('/posts', posts);
app.use('/tags', tags);

module.exports = app;