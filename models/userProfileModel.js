const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    accountType: { type: String, required: true },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    gender: { type: String, required: false },
    accountStatus: { type: String, required: false },
    avatar: { type: String, required: false },
    contactNumber: { type: String, required: false },
    title: { type: String, required: false },
    about: { type: String, required: false },
    skills: { type: Array, required: false },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "reviews",
    }],
});

module.exports = mongoose.model("profile", userProfileSchema);
