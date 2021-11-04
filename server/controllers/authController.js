const { Message } = require('../models/MessageModel');
const cookieParser = require('cookie-parser');

const authController = {};


authController.checkCookie = (req, res, next) => {

  console.log('Checking Cookie');
  console.log(req.cookies);
  console.log(cookieParser);

  return next();
};


module.exports = authController;