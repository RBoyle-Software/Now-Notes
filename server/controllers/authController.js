const { Message } = require('../models/MessageModel');
// const cookieParser = require('cookie-parser');

const authController = {};

authController.checkCookie = (req, res, next) => {
  console.log('*** Checking a Cookie ***');

  const idToCheck = req.params.id;
  const cookieValue = req.cookies.pass;

  Message.findOne({ _id: idToCheck }, (err, response) => {
    if (err) {
      return next(err);
    }
    if (response.password === cookieValue) {
      console.log('\n', '*** Authenticated ***', '\n');
      return next();
    } else {
      console.log('\n', '*** Not Authenticated ***', '\n');
      return err;
    }
  });
};


module.exports = authController;