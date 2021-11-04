
const { Message } = require('../models/MessageModel');


const authController = {};


authController.setCookie = (req, res, next) => {

  Message.find({}, (err, allMessages) => {
    if (err) {
      return next(err); 
    }

    res.locals.messages = allMessages;
    return next(); 
  });
};


module.exports = authController;