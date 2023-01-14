import { CacheType, ChatInputCommandInteraction, GuildForumTag, SlashCommandBuilder } from 'discord.js';

const isForumThread = (interaction: ChatInputCommandInteraction<CacheType>): boolean => {
    return interaction.channel?.isThread() ?? false;
}

const isThreadAuthor = (interaction: ChatInputCommandInteraction<CacheType>): boolean => {
    // TODO: Get ID of thread author
    const authorId = '';

    return interaction.user.id === authorId;
};

const findSolvedTag = (availableTags: GuildForumTag[]): GuildForumTag => {
    const tag = availableTags.find((tag) => tag.name.toLowerCase() === 'solved');

    if (!tag) {
        throw new Error('Could not find solved tag');
    }

    return tag;
};

export default {
    data: new SlashCommandBuilder()
        .setName('solved')
        .setDescription('Mark thread as solved'),

    execute: async (interaction: ChatInputCommandInteraction<CacheType>) => {
        if (!isForumThread(interaction)) {
            return await interaction.reply({
                content: 'This command may only be ran in forum threads.',
                ephemeral: true,
            });
        }

        if (!isThreadAuthor(interaction)) {
            return await interaction.reply({
                content: 'Only the author of the thread may mark the thread as solved.',
                ephemeral: true,
            });
        }

        // TODO: Apply solved tag to thread
        // TODO: Lock thread

        return await interaction.reply({
            content: 'Thread has been marked as solved.',
            ephemeral: true,
        });
    },
};
