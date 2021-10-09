const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
// const MessageController = require('../controllers/messageController');
const router = express.Router();
require('dotenv').config();


const PORT = process.env.PORT;


mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true }
);
  
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

app.use(express.static(path.join(__dirname, '../views')));
app.use(express.static(path.join(__dirname, '../assets')));


// app.get('/', MessageController.getMessages, (req, res, next) => {

// });


app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));