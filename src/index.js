// ./src/index.js

require('dotenv').config();
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const { CommandHandler } = require('djs-commander');
const mongoose = require('mongoose');
const path = require('path');

// Create a new Discord client instance
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
    partials: [
        Partials.Channel
    ],
});

// Initialize CommandHandler for organizing commands and events
new CommandHandler({
    client,
    eventsPath: path.join(__dirname, 'events'),
    commandsPath: path.join(__dirname, 'commands'),
    // validationsPath: path.join(__dirname, 'validations'), // Optional validations
});

// Async function to connect to MongoDB and login to Discord
(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB.');
        
        await client.login(process.env.DISCORD_BOT_TOKEN);
        console.log('✅ Connected to Discord.');
    } catch (error) {
        console.error('⚠️ Error connecting to MongoDB or Discord:', error);
        process.exit(1);
    }
})();
