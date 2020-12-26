const { Guild, MessageReaction } = require('discord.js');
const messager = require('./messager');

const reactions = ['2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟', '🐦', '🐕‍🦺', '🎳', '🐅', '🇬', '🇦'];

module.exports = client => {
    const channelID = '491759340911591424';
    index = 1;

    const getEmoji = emojiName => client.emojis.cache.find(emoji => emoji.name === emojiName)

    const emojis = {
        wf2: '#WF2#',
        wf3: '#WF3#',
        wf4: '#WF4#',
        wf5: '#WF5#',
        wf6: '#WF6#',
        wf7: '#WF7#',
        wf8: '#WF8#',
        wf9: '#WF9#',
        wf10: '#WF10#',
        shs: '#SHS#',
        bdh: '#BDH#',
        usf: '#USF#',
        gfl: '#GFL#',
        htl: '#HTL#',
        amz: '#AMZ#'
    }

    const handelReaction = async (reaction, user, add) => {
        if (user.id === "790173314995847189") { return; }
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (!reaction.message.guild) return;

        const reactors = ['2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟', '🐦', '🐕‍🦺', '🎳', '🐅', '🇬', '🇦'];
        const emoji = reaction.emoji.name;
        // console.log(reactors);
        const { guild } = reaction.message;
        let roleIndex = 0;
        let frIndex = -1;
        for (const variable in reactors){
            // console.log(reactors[variable]);
            // console.log(emoji);
            if (reactors[variable] === emoji){
                frIndex = roleIndex;
            }
            roleIndex++;
        }
        if (frIndex === -1) { return; }
        const roleName = emojis[frIndex];
        console.log(roleName);
        const role = guild.roles.cache.find(role => role.name === roleName);
        const member = guild.members.cache.find(member => member.id === user.id);
        if (add){
            member.roles.add(role);
        } else {
            member.roles.remove(role);
        }

    }

    let eText = '';
    indexPos = 0;
    for (const key in emojis) {
        if (key.includes(':')) {
            const split = key.split(':');
            emojiName = split[1];
            key = guild.emojis.cache.find((emoji) => {
                return emojiName === emoji.name;
            });
        }
        //console.log(key);
        //const emoji = getEmoji(key.emote);
        const emoji = reactions[indexPos++];
        //reactions.push(emoji)
        const role = emojis[key];
        eText += `${emoji} = ${role}\n`
    }
    const MessageID = messager(client, channelID, eText, reactions, index++);
    console.log(reactions);

    //messager(client, channelID, 'eText', ['✅'], index++);
    //2️⃣,3️⃣,4️⃣,5️⃣,6️⃣,7️⃣,8️⃣,9️⃣,🔟,🐦,🐕‍🦺,🎳,🐅,🇬,🇦
    //1️⃣0️⃣
    client.on('messageReactionAdd', (reaction, user) => {
        if (reaction.message.channel.id === channelID) {
            handelReaction(reaction, user, true);
        }
    })

    client.on('messageReactionRemove', (reaction, user) => {
        if (reaction.message.channel.id === channelID) {
            handelReaction(reaction, user, false);
        }
    })
}