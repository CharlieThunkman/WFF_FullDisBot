const Discord = require('discord.js');
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });

module.exports = {
    commands: ['react', 'reaction'],
    description: 'Allows users to sign up for an event',
    expectedArgs: '<time> <name>',
    callback: (message, args, text) => {
        async (message, args, Discord, client) => { 
            const channel = '491759340911591424';
            const eAvailable = '⚔️';
            const eDefend = '🛡️';
            const eNotAvailable = '🚫';
            const Alliances = [];
            let newEvent = await message.channel.send('pong');
            newEvent.react(eAvailable);
            newEvent.react(eDefend);
            newEvent.react(eNotAvailable);

            client.on('messageReactionAdd', async (reaction, user) => {
                if (reaction.message.partial) await reaction.message.fetch();
                if (reaction.partial) await reaction.fetch();
                if (user.bot) return;
                if (!reaction.message.guild) return;
                if (reaction.message.channel.id == channel) {
                    if (reaction.emoji.name === eAvailable) {
                        await reaction.message.update('ok, n0w what?');
                    }
                    if (reaction.emoji.name === eDefend) {
                        await reaction.message.update('ok, n1w what?');
                    }
                    if (reaction.emoji.name === eNotAvailable) {
                        await reaction.message.update('ok, n2w what?');
                    }
                }
            });
            client.on('messageReactionRemove', async (reaction, user) => {
                if (reaction.message.partial) await reaction.message.fetch();
                if (reaction.partial) await reaction.fetch();
                if (user.bot) return;
                if (!reaction.message.guild) return;
                if (reaction.message.channel.id == channel) {
                    if (reaction.emoji.name === eAvailable) {
                        await reaction.message.update('ok, n3w what?');
                    }
                    if (reaction.emoji.name === eDefend) {
                        await reaction.message.update('ok, n4w what?');
                    }
                    if (reaction.emoji.name === eNotAvailable) {
                        await reaction.message.update('ok, n5w what?');
                    }
                }
            });
        }
    },
}