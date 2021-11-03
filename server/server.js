const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');

const messageController = require('../server/controllers/messageController');
require('dotenv').config();


const PORT = process.env.PORT;


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


app.get('/messages', messageController.getMessages, (req, res, next) => {
  res.status(200).json(res.locals.messages);
});


app.post('/messages', messageController.postMessage, (req, res, next) => {
  res.status(200).json(res.locals.new);
});


app.delete('/messages/:id', messageController.deleteMessage, (req, res, next) => {
  res.status(200).json(res.locals.deleted);
});


app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));