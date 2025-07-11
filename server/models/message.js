const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
    text: { type: String, required: true },
}, {timestamps: true});


module.exports = mongoose.model("Message", messageSchema);