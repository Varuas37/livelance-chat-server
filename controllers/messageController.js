const Messages = require("../models/messageModel");
const Users = require("../models/userModel");

module.exports.getMessages = async (req, res, next) => {
  try {
    // TODO prolly wanna refactor this to be more secure
    // right now this endpoint gets the messages between any two user ids 
    // i.e. without security logic, u can fetch anyone two peoples message history
    // refactor so from value comes from http header/session/jwt

    const { from, to, email } = req.body;
    let foundUserId = to;
    if(email && !to){
      console.log("user's email", email);
      const foundUser = await Users.findOne({
        email,
      })
      foundUserId = foundUser._id
      console.log("Found userId", foundUserId);
     
    }
    
    const messages = await Messages.find({
      users: {
        $all: [from, foundUserId],
      
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

module.exports.getContacts = async (req, res, next) => {
  try {
    
    const users = await Messages.distinct("users.1", {
      "users.0": '6238fa1a662e4540705bb4b1'},);
      console.log("in contacts", users);
    //TODO need to find user.0 instead of hardcoded
    return res.json(users);
  } catch (ex) {
    console.log("in contacts", ex);
    next(ex);
  }
};