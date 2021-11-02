const { Message } = require('../models/MessageModel');


const messageController = {};

// get messages
messageController.getMessages = (req, res, next) => {
  console.log('*** Retrieving All Messages ***');

  Message.find({}, (err, allMessages) => {
    if (err) {
      return next(err); 
    }

    res.locals.messages = allMessages;
    return next(); 
  });
};


// post new message
messageController.postMessage = (req, res, next) => {
  console.log('*** Posting a Message ***');

  Message.create( {
    message: req.body.message,
    password: req.body.password
  }, (err, message) => {
    if (err) {
      return next(err); 
    }
    res.locals.new = message;
    return next(); 
  });
};


// delete message
messageController.deleteMessage = (req, res, next) => {
  console.log('*** Deleting a Message ***');

  Message.deleteOne({ _id: req.body }, (err, deleted) => {
    if (err) {
      return next(err);
    }
    res.locals.deleted = deleted;
    return next();
  });
};


module.exports = messageController;