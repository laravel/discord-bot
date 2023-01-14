import { REST, Routes } from 'discord.js';
import { Solved } from './commands';

const token = process.env.BOT_TOKEN;
const clientId = process.env.DISCORD_CLIENT_ID;
const guildId = process.env.DISCORD_GUILD_ID;

if (!token) {
    throw new Error('BOT_TOKEN environment variable is not set');
}

if (!clientId) {
    throw new Error('DISCORD_CLIENT_ID environment variable is not set');
}

if (!guildId) {
    throw new Error('DISCORD_GUILD_ID environment variable is not set');
}

const commands = [];

commands.push(Solved.data.toJSON());

const rest = new REST().setToken(token);

(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application slash command(s).`);

        const uri = Routes.applicationGuildCommands(clientId, guildId);
        const data: any = await rest.put(uri, {
            body: commands,
        });

        console.log(`Successfully reloaded ${data.length} application slash command(s).`);
    } catch (error) {
        console.error(error);
    }
})();
