// ./src/events/ready/start-cron-job.js

const cron = require('node-cron');
const UserActivityService = require('../../services/user-activity-service');

module.exports = (client) => {
    const frequencyInHours = process.env.REMOVE_ROLE_FREQUENCY;
    const cronExpression = `0 */${frequencyInHours} * * *`; // Runs every frequencyInHours hours

    if (client.user.tag) {
        console.log(`✅ Scheduling jobs for ${client.user.tag}!`);
    } else {
        console.log(`✅ Scheduling jobs for ${client.user.username}!`);
    }

    // Immediately run once and then schedule the cron job
    UserActivityService.refreshRoleAllGuilds(client);

    cron.schedule(cronExpression, () => {
        console.log('✅ Running scheduled job to refresh roles for all guilds');
        UserActivityService.refreshRoleAllGuilds(client);
    });
};
