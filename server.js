const express = require('express');
const path = require('path');
const { connect } = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

const errorHandlers = require('./helpers/ErrorHandlers');
const userRouter = require('./routes/user.routes');
const postRouter = require('./routes/post.routes');
const commentRouter = require('./routes/comment.routes');
const todoRouter = require('./routes/todo.routes');
const albumRouter = require('./routes/album.routes');
const photoRouter = require('./routes/photo.routes');

// Middlewares
app.use(express.static(__dirname));
app.use(express.static(path.resolve(__dirname, 'build')));
app.use(express.json());
app.use(cors());

// API Routers
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);
app.use('/api/todos', todoRouter);
app.use('/api/albums', albumRouter);
app.use('/api/photos', photoRouter);

// Errors and redirect
app.all('*', (req, res) => res.redirect('/'));
app.use(errorHandlers.internalServer);

const startServer = async () => {
  try {
    await connect(process.env.DB_URL);
    app.listen(PORT, () =>
      console.log(`Server has been started on port ${PORT}...`)
    );
  } catch (error) {
    console.error(error.stack);
  }
};

startServer();
