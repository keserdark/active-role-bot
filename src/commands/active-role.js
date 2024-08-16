// ./src/commands/active-role.js

const { ApplicationCommandOptionType } = require('discord.js');
const GuildSettingsService = require('../services/guild-settings-service');
const checkAdminPermission = require('../utils/check-permissions');

module.exports = {
    data: {
        name: 'active-role',
        description: 'Set the active role to be assigned to users.',
        options: [{
            name: 'role',
            description: 'The role to assign',
            type: ApplicationCommandOptionType.Role,
            required: true,
        }]
    },

    run: async ({ interaction }) => {
        if (!checkAdminPermission(interaction)) return;
        
        const guildId = interaction.guild.id;
        const role = interaction.options.getRole('role');

        try {
            await GuildSettingsService.updateActiveRole(guildId, role.id);
            return interaction.reply({
                content: `Active role updated to ${role.name}.`,
                // ephemeral: true,
            });
        } catch (error) {
            console.error(`Error updating active role: ${error}`);
            return interaction.reply({
                content: 'Failed to update active role.',
                ephemeral: true,
            });
        }
    }
};
