// ./src/services/user-activity-service.js

const UserActivity = require('../database/user-activity');
const GuildSettingsService = require('./guild-settings-service');
const { assignRoleDiscord, removeRoleDiscord } = require('../utils/discord-role-operations');

class UserActivityService {
    async recordMessage(userId, guildId) {
        try {
            const now = new Date();
            let userActivity = await UserActivity.findOneAndUpdate(
                { userId, guildId },
                { lastMessageTimestamp: now, updatedAt: now },
                { new: true, upsert: true }
            );

            return userActivity;
        } catch (error) {
            console.error('Error recording message:', error);
            throw error;
        }
    }

    async assignRoleDatabase(userId, guildId) {
        try {
            await UserActivity.findOneAndUpdate(
                { userId, guildId },
                { roleAssigned: true, updatedAt: new Date() }
            );
        } catch (error) {
            console.error('Error assigning role in database:', error);
            throw error;
        }
    }

    async removeRoleDatabase(userId, guildId) {
        try {
            await UserActivity.findOneAndUpdate(
                { userId, guildId },
                { roleAssigned: false, updatedAt: new Date() }
            );
        } catch (error) {
            console.error('Error removing role in database:', error);
            throw error;
        }
    }

    async assignRole(userId, guildId, message, guildSettings) {
        try {
            if (!guildSettings || !guildSettings.activeRoleId) {
                console.error(`No active role ID found for guild ${guildId}`);
                return;
            }

            await assignRoleDiscord(userId, message.guild, guildSettings.activeRoleId);
            await this.assignRoleDatabase(userId, guildId);
        } catch (error) {
            console.error('Error assigning role:', error);
            throw error;
        }
    }

    async removeRole(userId, guildId, guild) {
        try {
            const guildSettings = await GuildSettingsService.getSettings(guildId);
            if (!guildSettings || !guildSettings.activeRoleId) {
                console.error(`No active role ID found for guild ${guildId}`);
                return;
            }

            await removeRoleDiscord(userId, guild, guildSettings.activeRoleId);
            await this.removeRoleDatabase(userId, guildId);
        } catch (error) {
            console.error('Error removing role:', error);
            throw error;
        }
    }

    async findInactiveUsers(guildId, duration) {
        const cutoff = new Date(Date.now() - duration * 60 * 60 * 1000); // duration in hours
        try {
            const inactiveUsers = await UserActivity.find({
                guildId,
                lastMessageTimestamp: { $lt: cutoff },
                roleAssigned: true
            });

            return inactiveUsers;
        } catch (error) {
            console.error('Error finding inactive users:', error);
            throw error;
        }
    }

    async refreshRolesOneGuild(guildId, guild) {
        try {
            const guildSettings = await GuildSettingsService.getSettings(guildId);

            if (!guildSettings) {
                console.error(`No settings found for guild ${guildId}`);
                return;
            }

            const inactiveUsers = await this.findInactiveUsers(guildId, guildSettings.activityDuration);

            for (const user of inactiveUsers) {
                await this.removeRole(user.userId, guildId, guild);
                console.log(`❎ Removed role from user ${user.userId} in guild ${guildId}`);
            }
        } catch (error) {
            console.error(`Error refreshing roles for guild ${guildId}:`, error);
        }
    }

    async refreshRoleAllGuilds(client) {
        try {
            const allGuildSettings = await GuildSettingsService.getSettingsAllGuilds();

            for (const settings of allGuildSettings) {
                const guild = client.guilds.cache.get(settings.guildId);
                if (guild) {
                    await guild.members.fetch();
                    await this.refreshRolesOneGuild(settings.guildId, guild);
                }
            }
        } catch (error) {
            console.error('Error refreshing roles for all guilds:', error);
            throw error;
        }
    }
}

module.exports = new UserActivityService();
