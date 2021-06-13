require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

// middleware
app.use(express.json());
app.use(morgan('combined'));
app.use(cors());

// routes
require('./api/users/users.router')(app);

app.get('/', (req, res) => {
  res.send({
    message: 'Success',
  });
});

app.listen(process.env.APP_PORT, () => {
  console.log(
    `Server running at http://localhost:${process.env.APP_PORT}/`);
})