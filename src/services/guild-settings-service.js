// ./src/services/guild-settings-service.js

const GuildSettings = require('../database/guild-settings');

class GuildSettingsService {
    async getSettings(guildId) {
        try {
            const settings = await GuildSettings.findOne({ guildId });
            return settings;
        } catch (error) {
            console.error('Error getting guild settings:', error);
            throw error;
        }
    }

    async updateActiveRole(guildId, activeRoleId) {
        try {
            const settings = await GuildSettings.findOneAndUpdate(
                { guildId },
                { activeRoleId, updatedAt: new Date() },
                { new: true, upsert: true }
            );

            return settings;
        } catch (error) {
            console.error('Error updating active role:', error);
            throw error;
        }
    }

    async updateActivityDuration(guildId, activityDuration) {
        try {
            const settings = await GuildSettings.findOneAndUpdate(
                { guildId },
                { activityDuration, updatedAt: new Date() },
                { new: true, upsert: true }
            );

            return settings;
        } catch (error) {
            console.error('Error updating activity duration:', error);
            throw error;
        }
    }

    async getSettingsAllGuilds() {
        try {
            const settings = await GuildSettings.find();
            return settings;
        } catch (error) {
            console.error('Error getting settings for all guilds:', error);
            throw error;
        }
    }
}

module.exports = new GuildSettingsService();
