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


// post message
messageController.postMessage = (req, res, next) => {
  console.log('*** Posting a Message ***');

  // TODO: split the body into multiple variables
  const newMessage = req.body;
  console.log(newMessage);

  Message.create({ ...newMessage }, (err, message) => {
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

  // TODO: replace hardcoded string with req parameter
  const deleteId = '';

  Message.deleteOne({ _id: deleteId }, (err, messages) => {
    if (err) {
      return next(err); 
    }   
      
    res.locals.deleted = messages;
    console.log(messages);
    return next(); 
  });
};


module.exports = messageController;