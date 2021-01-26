import {BOT_PREFIX, DISCORD_TOKEN} from "./env";
import {infoCommand} from "./commands/info"
import {botStatus} from "./commands/misc"
import {updateStatus} from "./commands/status"

let Discord = require("discord.js");

export let botClient = new Discord.Client();

export let botStartupTime = new Date();

let token = DISCORD_TOKEN;
let botPrefix = BOT_PREFIX;

botClient.on('ready', async () => {
    console.log("Starting Up...")
    await botClient.user.setActivity('Heyo, I just booted up');
    setInterval(async () => {
        await updateStatus(botClient)
    }, 5000);
    console.log("Started")
});

botClient.on('message', async message => { 
    if (message.author.id === botClient.user.id) return;

    let msgContent = message.content.toLowerCase();

    let args = message.content.substring(botPrefix.length).split(" ");
    switch (args[0]) {
        case 'info': {
            infoCommand(args, message, botStartupTime, botClient);
        }
        break;
        case 'status': {
            botStatus(botClient, message, botStartupTime)
        }
        break;
    }
});

botClient.login(token);