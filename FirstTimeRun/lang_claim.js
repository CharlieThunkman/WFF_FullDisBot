const { Guild } = require('discord.js');
const messager = require('./messager');

module.exports = client => {
    const channelID = '792436679037681694';
    const messageID = '792461445676793866';

    const getEmoji = emojiName => client.emojis.cache.find(emoji => emoji.name === emojiName)

    const emojiText = {
        en: 'React with this flag to speak in this language for the respective channels.',
        es: 'Reacciona con esta bandera para hablar en este idioma por los canales respectivos.',
        pt: 'Reaja com este sinalizador para falar neste idioma para os respectivos canais.',
        ko: '이 플래그로 반응하여 각 채널에 대해이 언어로 말합니다.',
        ja: 'このフラグに反応して, それぞれのチャネルでこの言語で話します。',
        ch: '对此标志做出反应, 以该语言在各个频道中讲话。',
        de: 'Reagieren Sie mit diesem Flag, um in dieser Sprache für die jeweiligen Kanäle zu sprechen.',
        fr: 'Réagissez avec ce drapeau pour parler dans cette langue pour les canaux respectifs.',
    }
    const emojiRole = ['-EN-', '-ES-', '-PT-', '-KO-', '-JA-', '-CH-', '-DE-', '-FR-']

    const reactions = ['🇺🇸', '🇪🇸', '🇵🇹', '🇰🇷', '🇯🇵', '🇨🇳', '🇩🇪', '🇫🇷'];

    const handelReaction = async (reaction, user, add) => {
        if (user.id === "790173314995847189") { return; }
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (!reaction.message.guild) return;

        const reactors = ['🇺🇸', '🇪🇸', '🇵🇹', '🇰🇷', '🇯🇵', '🇨🇳', '🇩🇪', '🇫🇷'];
        const emoji = reaction.emoji.name;
        // console.log(reactors);
        const { guild } = reaction.message;
        let roleIndex = 0;
        let frIndex = -1;
        for (const variable in reactors) {
            // console.log(reactors[variable]);
            // console.log(emoji);
            if (reactors[variable] === emoji) {
                frIndex = roleIndex;
            }
            roleIndex++;
        }
        console.log(frIndex)
        if (frIndex === -1) return;
        console.log('found flag');
        const roleName = emojiRole[frIndex];
        console.log(roleName);
        const newRole = guild.roles.cache.find(role => role.name === 'New WFF Discord Member');
        const role = guild.roles.cache.find(role => role.name === roleName);
        const member = guild.members.cache.find(member => member.id === user.id);
        if (add) {
            member.roles.add(role);
            member.roles.remove(newRole);
        } else {
            member.roles.remove(role);
        }

    }
    let eText = `**======================================================**
`;
    indexPos = 0;
    for (const key in emojiText) {
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
        reactions.push(emoji)
        const role = emojiText[key];
        eText += `\n${emoji} <== ${role}\n`
    }
    messager(client, channelID, eText, reactions, messageID);
    //2️⃣,3️⃣,4️⃣,5️⃣,6️⃣,7️⃣,8️⃣,9️⃣,🔟,🐦,🐕‍🦺,🎳,🐅,🇬,🇦
    //1️⃣0️⃣
    //'🇨🇳','🇩🇪','🇪🇸','🇯🇵','🇰🇷','🇵🇹','🇺🇸'

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
