const ProfileModel = require('./Mongo_Models/profileSchema')

en_g = process.env.EN_G;
es_g = process.env.ES_G;
pt_g = process.env.PT_G;
ko_g = process.env.KO_G;
jp_g = process.env.JP_G;
ch_g = process.env.CH_G;
de_g = process.env.DE_G;
fr_g = process.env.FR_G;
it_g = process.env.IT_G;
ru_g = process.env.RU_G;
REACT_CNL1 = process.env.REACT_CNL1;
find_role = 'New WFF Discord Member';
if (!en_g) {
    //const { en_g, es_g, pt_g, ko_g, jp_g, ch_g, de_g, fr_g, REACT_CNL1 } = require('./config.json');
    const config = require('./config.json');
    en_g = config.en_g;
    es_g = config.es_g;
    pt_g = config.pt_g;
    ko_g = config.ko_g;
    jp_g = config.jp_g;
    ch_g = config.ch_g;
    de_g = config.de_g;
    fr_g = config.fr_g;
    it_g = config.it_g;
    ru_g = config.ru_g;
    REACT_CNL1 = config.REACT_CNL1;
    find_role = 'Member';
}

module.exports = {
    messages: async (client, member) => {
        const importantChannelID = REACT_CNL1;
        console.log(`Utilizing ${REACT_CNL1} Server`);

        SendWelcomeMessages(client, member);
        JoinProfileSchema(client, member);
        
    },
}

const JoinProfileSchema = async (client, member) =>{
    let profile = await ProfileModel.create({
        userID: member.id,
        serverID: server.guild.id,
        coins: 100,
        bank: 0
    });
    profile.save();
}

const SendWelcomeMessages = (client, member) =>{
    const en_message = `Welcome <@${member.id}> to the WFF Family! Please visit ${member.guild.channels.cache.get(importantChannelID)
        .toString()} to customize the discord server to fit your language preferences.`;

    const es_message = `¡Bienvenido <@${member.id}> a la familia WFF! Visita ${member.guild.channels.cache.get(importantChannelID)
        .toString()} para personalizar el servidor de discordia para que se ajuste a tus preferencias de idioma.`;

    const pt_message = `Bem-vindo <@${member.id}> à Família WFF! Visite ${member.guild.channels.cache.get(importantChannelID)
        .toString()} para personalizar o servidor discord para atender às suas preferências de idioma.`;

    const ko_message = `WFF 가족이 된 것을 환영합니다. <@${member.id}>!${member.guild.channels.cache.get(importantChannelID)
        .toString()} 를 방문하여 언어 기본 설정에 맞게 discord 서버를 사용자 정의하십시오 .`;

    const jp_message = `欢迎<@${member.id}>加入WFF家族请访问${member.guild.channels.cache.get(importantChannelID)
        .toString()} 以自定义不和谐服务器以适合您的语言首选项。`;

    const ch_message = `欢迎<@${member.id}>加入WFF家族请访问${member.guild.channels.cache.get(importantChannelID)
        .toString()} 以自定义不和谐服务器以适合您的语言首选项。`;

    const de_message = `Willkommen <@${member.id}> in der WFF-Familie! Bitte besuchen Sie ${member.guild.channels.cache.get(importantChannelID)
        .toString()}, um den Discord-Server an Ihre Spracheinstellungen anzupassen.`;
    
    const fr_message = `Bienvenue  <@${member.id}> dans la famille WFF! Veuillez visiter ${member.guild.channels.cache.get(importantChannelID)
        .toString()} pour personnaliser le serveur Discord en fonction de vos préférences linguistiques.`;

    const it_message = `Benvenuto <@${member.id}> nella famiglia WFF! Visita ${member.guild.channels.cache.get(importantChannelID)
        .toString()} per personalizzare il server Discord in base alle tue preferenze di lingua.`;

    const ru_message = `Добро пожаловать, <@${member.id}> в семью WFF! Посетите ${member.guild.channels.cache.get(importantChannelID)
        .toString ()}, чтобы настроить сервер Discord в соответствии с вашими языковыми предпочтениями.`;


    // Join overview role
    const role = member.guild.roles.cache.find((role) => {
        return role.name === find_role;
    });
    member.roles.add(role)

    const en_channel = member.guild.channels.cache.get(en_g)
    const es_channel = member.guild.channels.cache.get(es_g)
    const pt_channel = member.guild.channels.cache.get(pt_g)
    const ko_channel = member.guild.channels.cache.get(ko_g)
    const jp_channel = member.guild.channels.cache.get(jp_g)
    const ch_channel = member.guild.channels.cache.get(ch_g)
    const de_channel = member.guild.channels.cache.get(de_g)
    const fr_channel = member.guild.channels.cache.get(fr_g)
    const it_channel = member.guild.channels.cache.get(it_g)
    const ru_channel = member.guild.channels.cache.get(ru_g)

    en_channel.send(en_message);
    es_channel.send(es_message);
    pt_channel.send(pt_message);
    ko_channel.send(ko_message);
    ch_channel.send(ch_message);
    jp_channel.send(jp_message);
    de_channel.send(de_message);
    fr_channel.send(fr_message);
    it_channel.send(it_message);
    ru_channel.send(ru_message);

}
