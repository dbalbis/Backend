import chatService from '../services/chat.services.js';

const getAllMessages = async () => {
  try {
    const messages = await chatService.find();
    return messages;
  } catch (error) {
    console.log(error);
  }
};
const addMessage = async (email, message) => {
  try {
    const newMessage = await chatService.addMessage(email, message);
    return newMessage;
  } catch (error) {
    console.log(error);
  }
};

const getByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const data = await chatService.getByEmail(email);
    if (data) {
      res
        .status(200)
        .json({ message: 'Los mensajes de este usuario son:', data });
    } else {
      res.status(200).json({ message: 'El usuario no tiene mensajes' });
    }
  } catch (error) {
    console.log(error);
  }
};

export default { getAllMessages, addMessage, getByEmail };
