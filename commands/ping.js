module.exports = {
    commands: 'ping',
    expectedArgs: '',
    permissionError: '',
    description: 'this ping is command',
    minArgs: 0,
    maxArgs: 0,
    permissions: [],
    requiredRoles: [],
    callback: (message, args, text) => {
        message.channel.send('pong');
    },
}
