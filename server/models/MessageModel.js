const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const { format } = require('date-fns');
const Schema = mongoose.Schema;

// console.log(format(new Date(), 'EEE, MMMM dd yyyy') + ' at ' + format(new Date(), 'ppp'));

const MessageSchema = new Schema({
  message: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
  display_date: {
    type: String,
    default: format(new Date(), 'EEE, MMMM do yyyy') + ' at ' + format(new Date(), 'ppp')
  }
});


const Message = new mongoose.model('Messages', MessageSchema);

module.exports = { Message };
