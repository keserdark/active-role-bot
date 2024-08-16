// ./src/utils/check-permissions.js

const { PermissionFlagsBits } = require('discord.js');

module.exports = (interaction) => {
    const member = interaction.member;

    // Check if user has the MANAGE_GUILD permission or ADMINISTRATOR
    if (!member.permissions.has(PermissionFlagsBits.ManageGuild) && !member.permissions.has(PermissionFlagsBits.Administrator)) {
        interaction.reply({
            content: 'You do not have the necessary permissions (Manage Guild or Administrator) to use this command.',
            ephemeral: true,
        });
        return false;
    }
    return true;
};
