module.exports = {
    commands: 'role',
    expectedArgs: '[give/remove/has] <target users @> <Role name>',
    permissionError: 'Only R4+ can assign/modify roles',
    description: 'Modifies roles for whoever needs them.',
    minArgs: 2,
    permissions: [],
    requiredRoles: [],
    callback: async (message, args, text) => { 
        const targetUser = message.mentions.users.first();
        const action = args[0];
        if (action !== 'create') {
            if (!targetUser) {
                message.reply('Please specify someone to give the role to.');
                return;
            }
            args.shift();
        }
        args.shift();
        const roleName = args.join(' ');
        const { guild } = message;
        const role = guild.roles.cache.find((role) => {
            return role.name === roleName;
        });
        if (action === 'create') {
            let newRole = await message.guild.roles.create({
                data: {
                    name: roleName,
                    color: '0xE265FF',
                }
            });
            message.channel.send(`The role "${roleName}" has been crated.`);
            return;
        }
        const member = guild.members.cache.get(targetUser.id)
        if (!role) {
            message.reply(`There is no role with the name "${roleName}"`)
            return
        }
        if (action === 'give') {
            member.roles.add(role)
            message.reply(`That user now has the role "${roleName}".`);
            return;
        }
        if (action === 'remove') {
            if (member.role.cache.get(role.id)) {
                member.roles.remove(role)
                message.reply(`That user has been removed from the role "${roleName}".`);
            } else {
                message.reply(`That user doesn't have the role "${roleName}".`);
            }
            return;
        }
        if (action === 'has') {
            if (member.role.cache.get(role.id)) {
                message.reply(`That user has the role "${roleName}".`);
            } else {
                message.reply(`That user doesn't have the role "${roleName}".`);
            }
        }
    },
}
