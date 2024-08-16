// ./src/utils/discord-role-operations.js

async function assignRoleDiscord(userId, guild, roleId) {
    try {
        const role = guild.roles.cache.get(roleId);
        if (!role) {
            console.error(`Role with ID ${roleId} not found in guild ${guild.id}`);
            return;
        }

        const member = guild.members.cache.get(userId);
        if (!member) {
            console.error(`Member with ID ${userId} not found in guild ${guild.id}`);
            return;
        }

        await member.roles.add(role);
        console.log(`✅ Assigned role ${role.name} to user ${member.user.username}`);
    } catch (error) {
        console.error('Error assigning role:', error);
        throw error;
    }
}

async function removeRoleDiscord(userId, guild, roleId) {
    try {
        const role = guild.roles.cache.get(roleId);
        if (!role) {
            console.error(`Role with ID ${roleId} not found in guild ${guild.id}`);
            return;
        }

        const member = guild.members.cache.get(userId);
        if (!member) {
            console.error(`Member with ID ${userId} not found in guild ${guild.id}`);
            return;
        }

        await member.roles.remove(role);
        console.log(`❎ Removed role ${role.name} from user ${member.user.username}`);
    } catch (error) {
        console.error('Error removing role:', error);
        throw error;
    }
}

module.exports = {
    assignRoleDiscord,
    removeRoleDiscord,
};
