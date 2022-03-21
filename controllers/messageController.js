const Messages = require("../models/messageModel");
const Users = require("../models/userModel");

module.exports.getMessages = async (req, res, next) => {
  try {
    // TODO prolly wanna refactor this to be more secure
    // right now this endpoint gets the messages between any two user ids 
    // i.e. without security logic, u can fetch anyone two peoples message history
    // refactor so from value comes from http header/session/jwt

    const { from, to, email } = req.body;

    if(email && !to){
      const foundUserId = await Users.findOne({
        email,
      })._id
      console.log("Found user", findUser);
    }

    const messages = await Messages.find({
      users: {
        $all: [from, foundUserId || to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};
