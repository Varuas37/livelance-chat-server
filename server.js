const express = require("express");
const mongoSanitize = require("express-mongo-sanitize");
var helmet = require("helmet");
const connectDB = require("./config/db");
var cors = require("cors");
const socket = require("socket.io");
const app = express();

const messageRoutes = require("./routes/messages")
var onlineUsers

//Connect to DB
connectDB();
//Init Middleware
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use(mongoSanitize());
app.use(helmet());

/* -------------------------------------------------------------------------- */
/*                              // Define Routes                              */
/* -------------------------------------------------------------------------- */

app.use("/api/messages", messageRoutes);
// Check if the api is running
app.get("/", (req, res) =>
    res.send("<h1> Hello there 😎</h1><p>The Message Server is Running</p>")
);

const PORT = process.env.PORT || 5501;
var server = app.listen(PORT, () => console.log(`Server Started on ${PORT}`));


const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.msg);
        }
    });
});