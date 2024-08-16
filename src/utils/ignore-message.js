// ./src/utils/ignore-message.js

const { getSettings } = require('../services/guild-settings-service');

module.exports = async (message) => {
    // Ignore messages from bots, system messages, and interactions
    if (message.author?.bot || message.system || message.isInteraction) return { ignore: true };

    // Ignore messages from DMs
    const guildId = message.guild ? message.guild.id : null;
    if (!guildId) return { ignore: true };

    // Check and return guild settings
    const guildSettings = await getSettings(guildId);
    if (!guildSettings) {
        console.log(`Guild ${guildId} is not set up yet.`);
        return { ignore: true };
    }

    return { ignore: false, guildSettings };
};
