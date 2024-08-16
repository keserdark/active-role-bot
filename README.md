# Active Role Bot

A Discord bot to assign roles to active members. It records user activity, assigns roles based on message activity, and removes roles for inactivity after a certain period. The project was inspired by [MatthewManley's activitybot](https://github.com/MatthewManley/activitybot) and aims to enable users to create their own activity bot with minimal programming experience.


## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Contributing](#contributing)



## Features

- Automatically assigns roles to active members based on message activity with no delay.
- Removes roles from inactive members after a configurable period.
- Simple and user-friendly setup.


## Getting Started

Follow these steps to set up and start using the Active Role Bot:

### 1. Set Up a Virtual Private Server (VPS) *(Optional)*

If you want the bot to run 24/7, it's recommended to use a VPS. You can rent a VPS from providers like [Vultr](https://www.vultr.com/?ref=9435847) and [RackNerd](https://my.racknerd.com/aff.php?aff=12199
). Once your VPS is set up, SSH into the server.

### 2. Create a Discord Bot

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications).
2. Click on "New Application" and provide a name.
3. Navigate to the "Bot" section:
 - Click "Reset Token", and copy the bot token.
 - Turn on "Presence Intent", "Server Members Intent", and "Message Content Intent". 
 - Turn off "Public Bot" if you want to.
4. Navigate to the "Oauth2" section:
 - Under "OAuth2 URL Generator - Scopes", select "bot" and "applications.commands". 
 - Under "OAuth2 URL Generator - Bot Permissions", select "Manage Roles", "Send Messages", and "Read Message Histroy". 
 - Click on "Copy" to copy the link to invite your bot into your servers.

### 3. Set Up MongoDB

1. Sign up for [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a new cluster.
2. Create a new database and user with access. Copy the password of the user.
3. Obtain the connection string.

### 4. Clone the Repository

On your local machine or VPS, clone the repository and navigate to the project directory:

```bash
git clone https://github.com/Zhiyuan-Fan-Frank/active-role-bot.git
cd active-role-bot
```

### 5. Install Dependencies

Ensure you have [Node.js](https://nodejs.org/) and npm installed, then run:

```bash
npm install
```

### 6. Configure Environment Variables

Create a `.env` file in the root directory of the project by copying and renaming the `.env.example` file. Paste your Discord Bot Token and MongoDB connection string into the respective fields.

### 7. Start the Bot

Once everything is set up, you can start the bot by running:

```bash
node .
```

Once the bot is running, use the slash commands on Discord to set up the server and configure the bot settings.


## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

