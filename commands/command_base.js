const my_prefix = process.env.DIS_PREFIX;
if(!my_prefix){
    const { my_prefix } = require('../config.json');
}
const validatePermissions = (permissions) => {
    [
        'CREATE_INSTANT_INVITE', 'KICK_MEMBERS', 'BAN_MEMBERS', 'ADMINISTRATOR',
        'MANAGE_CHANNELS', 'MANAGE_GUILD', 'ADD_REACTIONS', 'VIEW_AUDIT_LOG',
        'PRIORITY_SPEAKER', 'STREAM', 'VIEW_CHANNEL', 'SEND_NESSAGES',
        'SEND_TTS_MESSAGES', 'MANAGE_MESSAGES', 'EMBED_MESSAGES', 'ATTACH_FILES',
        'READ_MESSAGE_HISTORY', 'MENTION_EVERYONE', 'USE_EXTERNAL_EMOJIS',
        'VIEW_GUILD_INSIGHT', 'CONNECT', 'SPEAK', 'MUTE_MEMBERS',
        'DEAFEN_MEMBERS', 'MOVE_MEMBERS', 'USE_VAD', 'CHANGE_NAME', 
        'MANAGE_NICKNAMES', 'MANAGE_ROLES', 'MANAGE_WEBHOOKS', 'MANAGE_EMOJIS',
    ]
    for (const permission of permissions) {
        if (!validatePermissions.includes(permissions)) {
            throw new Error(`Unknown permission node "${permission}"`);
        }
    }
}

module.exports = (Discord, client, commandOptions) => {
    let {
        commands,
        expectedArgs = '',
        permissionError = 'Admin Perms are needed',
        minArgs = 0,
        maxArgs = null,
        permissions = [],
        requiredRoles = [],
        callback,
    } = commandOptions;
    if (typeof commands === 'string') {
        commands = [commands];
    }

    console.log(`Regerstring command "${commands[0]}"`);

    if (permissions.length) {
        if (typeof permissions === 'string') {
            permissions = [permissions];
        }
        validatePermissions(permissions);
    }

    client.on('message', message => {
        const { member, content, guild } = message;
        for (const alias of commands) {
            if (content.toLowerCase().startsWith(`${prefix}${alias.toLowerCase()}`)) {

                for (const permission of permissions) {
                    if (!member.hasPermission(permissions)) {
                        message.reply(permissionError);
                        return;
                    }
                }

                for (const requiredRole of requiredRoles) {
                    const role = guild.roles.cache.find(role => role.name === requiredRole)
                    if (!role || !member.roles.cache.has(role.id)) {
                        message.reply(`You must have the "${requiredRole}" role to use this command`);
                        return;
                    }
                }
                const arguments = content.split(/[ ]+/)
                arguments.shift();

                if (arguments.length < minArgs || (arguments.length > maxArgs && maxArgs !== null)) {
                    message.reply(`Incorrect syntax! Use ${my_prefix}${alias} ${expectedArgs}`)
                    return;
                }
                console.log(`Utilizing command "${alias}"`);
                callback(message, arguments, arguments.join(' '));

                return;
            }
        }
    });
}