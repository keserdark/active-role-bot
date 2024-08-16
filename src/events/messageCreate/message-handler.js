// ./src/events/messageCreate/message-handler.js

const shouldIgnoreMessage = require('../../utils/ignore-message');
const UserActivityService = require('../../services/user-activity-service');

module.exports = async (message) => {
    try {
        // console.log(`Message received from ${message.author.username}: ${message.content}`);
        // console.log("Message received: ", message);

        const { ignore, guildSettings } = await shouldIgnoreMessage(message);
        if (ignore) return;

        const userId = message.author.id;
        const guildId = message.guild.id;

        // Check message conditions (e.g., has attachments) to assign role
        // const shouldAssignRole = message.attachments.size > 0; // Example condition
        const shouldAssignRole = true; // Example condition
        if (shouldAssignRole) {
            await UserActivityService.recordMessage(userId, guildId);
            await UserActivityService.assignRole(userId, guildId, message, guildSettings);
        }
    } catch (error) {
        console.error('Error handling message:', error);
    }
};
