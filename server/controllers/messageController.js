import models from '../models/MessageModel/Message';


const messageController = {};


// get messages
messageController.getMessages = (req, res, next) => {
  const allMessages = 'db.Message.find()';
};


// post message


// delete message



export default { messageController };
