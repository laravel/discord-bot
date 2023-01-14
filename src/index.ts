import { Client, Collection, Events, GatewayIntentBits, SlashCommandBuilder } from 'discord.js';
import { Solved } from './commands';

interface SlashCommandDefinition {
    data: SlashCommandBuilder;
    execute: Function;
}

console.log('Bot is starting...');

const token = process.env.BOT_TOKEN;

if (!token) {
    throw new Error('BOT_TOKEN environment variable is not set');
}

const commands = new Collection<string, SlashCommandDefinition>();

commands.set(Solved.data.name, Solved);

const client = new Client({
    intents: [
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
    ],
});

client.once(Events.ClientReady, (client) => {
    console.log(`Ready! Logged in as ${client.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) {
        return;
    }

    const command = commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);

        await interaction.reply({
            content: 'There was an error while executing this command.',
            ephemeral: true,
        });
    }
});

client.login(token);
