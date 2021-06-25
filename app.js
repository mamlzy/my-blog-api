require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const multer = require('multer');

// middleware
app.use(express.json());
app.use(morgan('combined'));
app.use(cors());

// static
app.use('/images', express.static('upload/images'));

// routes
require('./api/users/users.router')(app);
require('./api/blogs/blogs.router')(app);

app.get('/', (req, res) => {
  res.send({
    message: 'Success',
  });
});

function errHandler(err, req, res, next) {
  if(err instanceof multer.MulterError) {
    res.status(400).json({
      sucess: 0,
      message: err.message,
    });
  }
}

app.use(errHandler);

app.listen(process.env.APP_PORT, () => {
  console.log(
    `Server running at http://localhost:${process.env.APP_PORT}/`);
})