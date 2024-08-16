// ./src/commands/active-duration.js

const { ApplicationCommandOptionType } = require('discord.js');
const GuildSettingsService = require('../services/guild-settings-service');
const checkAdminPermission = require('../utils/check-permissions');

module.exports = {
    data: {
        name: 'active-duration',
        description: 'Set the activity duration required to keep the role assigned.',
        options: [{
            name: 'hours',
            description: 'Duration in hours',
            type: ApplicationCommandOptionType.Integer,
            required: true,
        }]
    },

    run: async ({ interaction }) => {
        if (!checkAdminPermission(interaction)) return;

        const guildId = interaction.guild.id;
        const hours = interaction.options.getInteger('hours');

        try {
            await GuildSettingsService.updateActivityDuration(guildId, hours);
            return interaction.reply({
                content: `Activity duration updated to ${hours} hours.`,
                // ephemeral: true,
            });
        } catch (error) {
            console.error(`Error updating activity duration: ${error}`);
            return interaction.reply({
                content: 'Failed to update activity duration.',
                ephemeral: true,
            });
        }
    }
};
