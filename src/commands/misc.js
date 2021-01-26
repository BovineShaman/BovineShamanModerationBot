import {calcInterval, formatInterval} from "../util/time";

let Discord = require("discord.js");
let moment = require('moment-timezone');

export let botStatus = (bot, message, botStartupTime) => {

    let botInfoEmbed = new Discord.MessageEmbed()
        .setTitle("Bot Status")
        .addField("Discord Identity", `${bot.user.username}\`#${bot.user.discriminator}\`\n(\`${bot.user.id}\`)`)
        .setThumbnail(bot.user.avatarURL)
        .setFooter(`Boot Time: ${moment(botStartupTime).format("dddd, MMMM Do YYYY, h:mm:ss a zz")}\n${formatInterval(calcInterval(botStartupTime))} ago`)

    return message.channel.send(botInfoEmbed)
}