const { prefix } = require('../config.json');
module.exports = {
    commands: 'help',
    description: 'this is command help',
    minArgs: 0,
    maxArgs: 1,
    callback: (message, args, text) => {
        console.log(args);
        message.channel.send(` 
For Musix commands: (prefix=!)
    **${prefix}help music**

For assistant commands: (prefix=?)
    **${prefix}help assist**

For Rita Translation commands (prefix=!)
    **${prefix}help music**

For Calendar Event commands (prefix=%)
    **${prefix}help calendar**

        `);
    },
}