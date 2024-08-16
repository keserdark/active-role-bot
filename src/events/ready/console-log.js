// ./src/events/ready/console-log.js

module.exports = (client) => {
    if (client.user.tag) {
        console.log(`✅ Logged in as ${client.user.tag}!`);
    } else {
        console.log(`✅ Logged in as ${client.user.username}!`);
    }
}