const { Guild } = require('discord.js');
const messager = require('./messager');

module.exports = client => {
    const channelID = '491759340911591424';
    index = 2;

    const getEmoji = emojiName => client.emojis.cache.find(emoji => emoji.name === emojiName)

    const emojis = {
        en: 'React with this flag to speak in this language for the respective channels.',
        es: 'Reacciona con esta bandera para hablar en este idioma por los canales respectivos.',
        pt: 'Reaja com este sinalizador para falar neste idioma para os respectivos canais.',
        ko: '이 플래그로 반응하여 각 채널에 대해이 언어로 말합니다.',
        ja: 'このフラグに反応して, それぞれのチャネルでこの言語で話します。',
        ch: '对此标志做出反应, 以该语言在各个频道中讲话。',
        de: 'Reagieren Sie mit diesem Flag, um in dieser Sprache für die jeweiligen Kanäle zu sprechen.',
    }

    const reactions = ['🇺🇸', '🇪🇸', '🇵🇹', '🇰🇷', '🇯🇵', '🇨🇳', '🇩🇪' /*, '8️⃣', '9️⃣', '🔟', '🐦', '🐕‍🦺', '🎳', '🐅', '🇬', '🇦'*/];

    let eText = `**======================================================**
`;
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
        reactions.push(emoji)
        const role = emojis[key];
        eText += `\n${emoji} <== ${role}\n`
    }
    const MessageID = messager(client, channelID, eText, reactions, index);
    //2️⃣,3️⃣,4️⃣,5️⃣,6️⃣,7️⃣,8️⃣,9️⃣,🔟,🐦,🐕‍🦺,🎳,🐅,🇬,🇦
    //1️⃣0️⃣
    //'🇨🇳','🇩🇪','🇪🇸','🇯🇵','🇰🇷','🇵🇹','🇺🇸'

    client.on('messageReactionAdd', (reaction, user) => {
        // console.log('addLang');
    })

    client.on('messageReactionRemove', (reaction, user) => {
        // console.log('removeLang');
    })
}