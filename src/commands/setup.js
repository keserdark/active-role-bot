// ./src/commands/setup.js

const { ApplicationCommandOptionType } = require('discord.js');
const GuildSettingsService = require('../services/guild-settings-service');
const UserActivityService = require('../services/user-activity-service');
const checkAdminPermission = require('../utils/check-permissions');

module.exports = {
    data: {
        name: 'setup',
        description: 'Setup the bot for this server by defining active role and activity duration.',
        options: [
            {
                name: 'role',
                description: 'The role to assign for active users',
                type: ApplicationCommandOptionType.Role,
                required: true,
            },
            {
                name: 'duration',
                description: 'Activity duration in hours required to keep the role',
                type: ApplicationCommandOptionType.Integer,
                required: true,
            }
        ]
    },

    run: async ({ interaction }) => {
        if (!checkAdminPermission(interaction)) return;

        const guildId = interaction.guild.id;
        const role = interaction.options.getRole('role');
        const duration = interaction.options.getInteger('duration');

        try {
            await GuildSettingsService.updateActiveRole(guildId, role.id);
            await GuildSettingsService.updateActivityDuration(guildId, duration);

            // Refresh roles for the guild after setup
            await UserActivityService.refreshRolesOneGuild(guildId);

            return interaction.reply({
                content: `Setup complete! \nActive role: ${role.name}, \nActivity duration: ${duration} hours.`,
                // ephemeral: true,
            });
        } catch (error) {
            console.error(`Error during bot setup: ${error}`);
            return interaction.reply({
                content: 'Failed to complete setup.',
                ephemeral: true,
            });
        }
    }
};
