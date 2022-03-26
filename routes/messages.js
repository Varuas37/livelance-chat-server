
const { addMessage, getMessages, getContacts } = require("../controllers/messageController");
const router = require("express").Router();

router.post("/addmsg/", addMessage);
router.post("/getmsg/", getMessages);
router.get("/getContacts", getContacts);

module.exports = router;
