import mongoose from "mongoose";
import Chat from "../models/chat.js";

// Asynchronous function to create a new chat
const createChat = async (req, res) => {
  try {
    const { users, messages } = req.body;
    // Validate users and messages
    if (!Array.isArray(users) || !users.every((id) => mongoose.Types.ObjectId.isValid(id))) {
      return res.send({ error: "Invalid users array" }).status(400);
    }
    if (!Array.isArray(messages) || !messages.every((id) => mongoose.Types.ObjectId.isValid(id))) {
      return res.send({ error: "Invalid messages array" }).status(400);
    }
    const data = {
      users,
      messages,
      active: true, // ignore any user-provided active values, default to true
    };
    const newChat = await Chat.create(data);
    res.send(newChat).status(201);
  } catch (err) {
    res.send(err).status(400);
  }
};

// Asynchronous function to get all chats, filtered if necessary
const getChats = async (req, res) => {
  try {
    const filter = req.filter;
    const chats = await Chat.find(filter).populate(["users", "messages"]);
    res.send(chats).status(200);
  } catch (err) {
    res.send(err).status(400);
  }
};

export default { createChat, getChats };
