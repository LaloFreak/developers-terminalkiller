const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    alias: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, required: false, default: false },
    token: { type: String, required: false },
    method: { type: String, required: false },
    googleId: { type: String, required: false },
    googlePic:{ type: String, required: false }
});

module.exports = mongoose.model('User', userSchema);
