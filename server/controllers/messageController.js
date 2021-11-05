const { Message } = require('../models/MessageModel');


const messageController = {};

// get messages
messageController.getMessages = (req, res, next) => {
  // console.log('*** Retrieving All Messages ***');

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

  res.cookie('pass', req.body.password);

  Message.create({
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

  Message.deleteOne({ _id: req.params.id }, (err, deleted) => {
    if (err) {
      return next(err);
    }
    res.locals.deleted = deleted;
    return next();
  });
};

// need to get the value at pass from the existing cookie
// get the object id from the button clicked
// find the object in the db and check the password
// compare the cookie pass to the object password
// if they match, do the delete operation and delete the element
// if they do not match, alert

module.exports = messageController;