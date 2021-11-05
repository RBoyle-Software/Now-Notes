const { Message } = require('../models/MessageModel');
const cookieParser = require('cookie-parser');


const authController = {};

authController.checkCookie = (req, res, next) => {
  console.log('*** Checking a Cookie ***');

  return next();
};


module.exports = authController;