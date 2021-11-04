const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const PORT = process.env.PORT;

const messageController = require('../server/controllers/messageController');
const authController = require('../server/controllers/authController');

mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});


app.use(express.json());
app.use(express.static(path.join(__dirname, '../views')));
app.use(express.static(path.join(__dirname, '../assets')));
app.use(cookieParser());


app.get('/messages', messageController.getMessages, (req, res, next) => {
  res.status(200).json(res.locals.messages);
});


app.post('/messages', authController.checkCookie, (req, res, next) => {
  res.cookie('cookieName', '00001', { expires: new Date(Date.now() + 900000), httpOnly: true });
  next();
});

app.post('/messages',messageController.postMessage, (req, res, next) => {
  res.status(200).json(res.locals.new);
  next();
});


app.delete('/messages/:id', messageController.deleteMessage, (req, res, next) => {
  res.status(200).json(res.locals.deleted);
});


app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
