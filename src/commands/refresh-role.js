// ./src/commands/refresh-role.js

const UserActivityService = require('../services/user-activity-service');
const checkAdminPermission = require('../utils/check-permissions');

module.exports = {
    data: {
        name: 'refresh-role',
        description: 'Manually refresh roles for the current guild'
    },

    run: async ({ interaction }) => {
        if (!checkAdminPermission(interaction)) return;

        await interaction.deferReply();
        const guild = interaction.guild;
        const guildId = guild.id;

        try {
            await UserActivityService.refreshRolesOneGuild(guildId, guild);
            return interaction.editReply({
                content: 'Roles refreshed for the guild.',
                // ephemeral: true,
            });
        } catch (error) {
            console.error('Error refreshing roles via command:', error);
            return interaction.editReply({
                content: 'Error refreshing roles for the guild.',
                ephemeral: true,
            });
        }
    }
};
