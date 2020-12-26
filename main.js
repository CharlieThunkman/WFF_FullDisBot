const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
const config = require('./config.json');

const roleClaim = require('./FirstTimeRun/role_claim')
const langClaim = require('./FirstTimeRun/lang_claim')
const roleINIT = require('./commands/give_role')

/*client.commands = new Discord.Collection();
client.commandsCE = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
fileCC=0;
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
    fileCC++;
}

const commandFilesCE = fs.readdirSync('./commands/CalendarEvent').filter(file => file.endsWith('.js'));
for(const file of commandFilesCE){
    const command = require(`./commands/CalendarEvent/${file}`);
    client.commands.set(command.name, command);
}
*/
client.once('ready', () => {
    console.log('\n\n\n\n\n\n\n       CalBot is now online!\n');
    roleClaim(client);
    // langClaim(client);
    
    client.user.setPresence({
        activity: {
            name: `${config.prefix}help for help.`,
        }
    })
});

client.on('ready', async () => {
    const baseFile = 'command_base.js';
    const commandBase = require(`./commands/${baseFile}`);
    const readCommands = dir => {
        const files = fs.readdirSync(path.join(__dirname, dir))
        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file));
            if (stat.isDirectory()) {
                readCommands(path.join(dir, file));
            } else if (file !== baseFile) {
                const options = require(path.join(__dirname, dir, file));
                commandBase(Discord, client, options);
            }
        }
    }
    readCommands('commands')



})
/*
client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot)  return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if(command === 'ping'){
        client.commands.get('ping').execute(message, args);
    } else if(command === 'react'){
        client.commands.get('react').execute(message, args, Discord, client);
    } else if(command === 'cal'){
        client.commands.get('First_Message').execute(client, '789776248028790824', 'Discord is checking for some text editing property.', ['✅']);
    }
});

*/
client.login(config.token);
