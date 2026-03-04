import { Conversation } from "../Models/conversation.model.js";
import { Message } from "../Models/message.model.js";
import { getReceiverSocketId,io } from "../SocketIO/server.js";

const sendMessage = async (req, res) => {
  // console.log("Message sent!",req.params.id,req.body.message);
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id; // Current loggedIn User with its id vo hmee milega secureRoute se (middleware);

    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        members: [senderId, receiverId],
      });
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // await conversation.save();
    // await newMessage.save();

    //---------------------Save multiple data at one time with this method:---------------------
    await Promise.all([conversation.save(), newMessage.save()]); // run parallel;

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage: ", error);
    res.status(500).json({ error: "Failed to send message!" });
  }
};

const getMessage = async (req, res) => {
  try {
    const { id: chatUser } = req.params;
    const senderId = req.user._id; // Current logedIn user middleware ke andar..!

    // check kr rhe h.. DB ke andar, members ke andar inki sender or chatUser (receiver) ki conversation start hui h...
    // or fir hum messages ko show kr rhe h.. populate() ki help se..sender or chatUser ki screen pe messages ko.
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, chatUser] },
    }).populate("messages");

    // agar converstaion nhi hua h.. toh ek empty array return kr denge...!
    if (!conversation) {
      return res.status(201).json([]);
    }
    // or agar conversation hua h.. toh messages ko fetch krenge:---
    const messages = conversation.messages;
    res.status(201).json(messages);
  } catch (error) {
    console.log("Error in getMessage: ", error);
    res.status(500).json({ error: "Failed to get message!" });
  }
};

export { sendMessage, getMessage };
