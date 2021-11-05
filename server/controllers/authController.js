const { Message } = require('../models/MessageModel');
const cookieParser = require('cookie-parser');

const authController = {};

const cookieValue = 1;

authController.checkCookie = (req, res, next) => {

  res.cookie.cookieName = 'pass';
  res.cookie.cookieValue = cookieValue + 1;
  res.cookie.expires = new Date(Date.now() + 10000);
  res.cookie.httpOnly = true;

  return next();
};


module.exports = authController;