// ./src/database/user-activity.js

const mongoose = require('mongoose');

const userActivitySchema = new mongoose.Schema({
    userId: { type: String, required: true },
    guildId: { type: String, required: true },
    lastMessageTimestamp: { type: Date, default: Date.now },
    roleAssigned: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

userActivitySchema.index({ userId: 1, guildId: 1 }, { unique: true });

module.exports = mongoose.model('UserActivity', userActivitySchema);
