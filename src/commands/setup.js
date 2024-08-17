// ./src/commands/setup.js

const { ApplicationCommandOptionType } = require('discord.js');
const GuildSettingsService = require('../services/guild-settings-service');
const UserActivityService = require('../services/user-activity-service');
const checkAdminPermission = require('../utils/check-permissions');

module.exports = {
    data: {
        name: 'setup',
        description: 'Setup the bot for this server by defining active role and activity duration',
        options: [
            {
                name: 'role',
                description: 'The role to assign for active users',
                type: ApplicationCommandOptionType.Role,
                required: true,
            },
            {
                name: 'days',
                description: 'Duration in days',
                type: ApplicationCommandOptionType.Integer,
                required: true,
            },
            {
                name: 'hours',
                description: 'Duration in hours',
                type: ApplicationCommandOptionType.Integer,
                required: true,
            }
        ]
    },

    run: async ({ interaction }) => {
        if (!checkAdminPermission(interaction)) return;

        const guildId = interaction.guild.id;
        const role = interaction.options.getRole('role');
        const days = interaction.options.getInteger('days');
        const hours = interaction.options.getInteger('hours');
        const duration = (days * 24) + hours;

        try {
            await GuildSettingsService.updateActiveRole(guildId, role.id);
            await GuildSettingsService.updateActivityDuration(guildId, duration);

            // Refresh roles for the guild after setup
            await UserActivityService.refreshRolesOneGuild(guildId);

            return interaction.reply({
                content: `Setup complete! \nActive role: ${role.name}, \nActivity duration: ${days} days and ${hours} hours (${duration} hours total).`,
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
