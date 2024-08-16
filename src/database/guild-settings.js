// ./src/database/guild-settings.js

const mongoose = require('mongoose');

const guildSettingsSchema = new mongoose.Schema({
    guildId: { type: String, required: true, unique: true },
    activeRoleId: { type: String, required: true },
    activityDuration: { type: Number, default: 72 }, // in hours, default is 72 hours (3 days)
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('GuildSettings', guildSettingsSchema);
