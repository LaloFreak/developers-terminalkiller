const mongoose = require("mongoose");

const developerSchema = new mongoose.Schema({
    alias: { type: String, required: true },
    email: { type: String, required: true },
    method: { type: String, required: false },
    googlePic: { type: String, required: false },
    isVerified: { type: Boolean, required: false },
});

module.exports = mongoose.model('Developer', developerSchema);
