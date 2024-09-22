import Message from "../models/message.js";

// Asynchronous function to create a new message
const createMessage = async (req, res) => {
  try {
    const data = {
      ...req.body,
      status: undefined, // ignore any user-provided status values
    };
    const newMessage = await Message.create(data);
    res.send(newMessage).status(201);
  } catch (err) {
    res.send(err).status(400);
  }
};

export default { createMessage };
