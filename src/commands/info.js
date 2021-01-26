import {BOT_PREFIX} from "../env";

let Discord = require("discord.js");

import {formatTimeDiff} from "../util/time";

// TODO: Massive refactoring there

export function infoCommand(args, message, bot) {
    switch (args[1]) {
        case 'user': {
            if (!args[2]) {
                return message.channel.send("Please mention one user")
            }
            try {
                if (args[2]) {
                    if (message.mentions) {
                        let user = message.guild.member(message.mentions.users.first().id)//.then(user => {
                            let tempUser = message.mentions.users.first()
                            console.log('User `' + tempUser.tag + '` with id `' + tempUser.id + '` was found.')
                            if (!user.nickname) {
                                tempNickname = 'No nickname';
                            } else if (user.nickname) {
                                var tempNickname = '`' + user.nickname + '`';
                            }
                            let now = new Date()

                            let userGenInfoEmbed = new Discord.MessageEmbed()
                                .setTitle('User Information')
                                .addField('Basic Info', '**Username & Tag:** `' + tempUser.tag + '`\n**Nickname:** ' + tempNickname + '\n**User ID:** `' + user.id + '`\n')
                                .addField('Hex Color', user.displayHexColor)
                                .setThumbnail(tempUser.avatarURL({ dynamic:true, size:4096 }))
                                .setColor(user.displayHexColor)
                            let userInfoTimeEmbed = new Discord.MessageEmbed()
                                .addField("Relevant Dates",
                                    "User Creation:\n```" + tempUser.createdAt + '\n' + formatTimeDiff(now, tempUser.createdAt) + ' ago```' +
                                    '\nServer Creation:\n```' + message.guild.createdAt + '\n' + formatTimeDiff(now, message.guild.createdAt) + ' ago```' +
                                    '\nUser Join:\n```' + user.joinedAt + '\n' + formatTimeDiff(now, user.joinedAt) + ' ago```' +
                                    '\nCurrent Date:\n```' + now + '```')
                                .setColor(user.displayHexColor)
                                .setFooter('Requested by ' + message.author.username + ' (' + message.author.id + ')\n' + now, message.author.avatarURL)
                            message.channel.send(userGenInfoEmbed)
                            message.channel.send(userInfoTimeEmbed)
                        }
                    }
                } catch (error) { message.channel.send("Please give a valid user!")}
            }
            break;
        case 'server': {
            let tempGuild = message.guild;
            let now = new Date()
            let serverInfoEmbed = new Discord.MessageEmbed()
                .setTitle("Server Info - " + message.guild.name + " (`" + message.guild.nameAcronym + "`)")
                .addField("Total Members", '`' + tempGuild.members.cache.filter(m => m.presence.status !== 'offline').size + '`/`' + tempGuild.members.cache.size + '` Members', true)
                .addField("Human Users", '`' + tempGuild.members.cache.filter(m => m.user.bot === false).filter(m => m.presence.status !== 'offline').size + '`/`' + tempGuild.members.cache.filter(m => m.user.bot === false).size + '` Humans', true)
                .addField("Bot Users", '`' + tempGuild.members.cache.filter(m => m.user.bot === true).filter(m => m.presence.status !== 'offline').size + '`/ `' + tempGuild.members.cache.filter(m => m.user.bot === true).size + '` Bots', true)
                .addField("Text Channels", '`' + message.guild.channels.cache.filter(c => c.type === 'text').size + '` Text Channels', true)
                .addField("Voice Channels", '`' + message.guild.channels.cache.filter(c => c.type === 'voice').size + '` Voice Channels', true)
                .addField("Categories", '`' + message.guild.channels.cache.filter(c => c.type === 'category').size + '` Categories', true)
                .addField("Booster Level", "Level `" + message.guild.premiumTier + "`/`3`", true)
                .addField("Boosters", "`" + message.guild.premiumSubscriptionCount + "` Boosters", true)
                .addField('\u200b','\u200b', true)
                .addField("Relevant Dates", 'Server Creation:\n```' + message.guild.createdAt + '\n' + formatTimeDiff(now, message.guild.createdAt) + ' ago```' + '\nCurrent Date:\n```' + now + '```')
                .setFooter('Requested by ' + message.author.username + ' (' + message.author.id + ')\n' + now, message.author.avatarURL)
                .setThumbnail(tempGuild.iconURL)
            let tempEmojiList = ''
            let emojiEmbedCount = 0
            message.guild.emojis.cache.forEach(emoji => {
                tempEmojiList = tempEmojiList + " " + emoji.toString();
                if ((tempEmojiList.split(":").length - 1) === 32) {
                    serverInfoEmbed.addField("** **", tempEmojiList, true);
                    tempEmojiList = '';
                    emojiEmbedCount += 1;
                }
            })
            if ((tempEmojiList.split(":").length - 1) < 32) {
                serverInfoEmbed.addField("** **", tempEmojiList, true);
                emojiEmbedCount += 1;
            }
            if ((emojiEmbedCount % 3) === 1) {
                serverInfoEmbed.addField('\u200b','\u200b', true);
            } else if ((emojiEmbedCount % 3) === 2) {
                serverInfoEmbed.addField('\u200b','\u200b', true);
                serverInfoEmbed.addField('\u200b','\u200b', true);
            }
            if (tempGuild.bannerURL != null) serverInfoEmbed.setImage(tempGuild.bannerURL({size:1024}))
            message.channel.send(serverInfoEmbed)
        }
            break;
        default: {
            let tempError = new Discord.MessageEmbed()
                .setTitle("Error - Missing Arguments")
                .addField(BOT_PREFIX + "info", "> `" + BOT_PREFIX + "info user @user` -> Gives information about specific server member\n> `" + BOT_PREFIX + "info server` -> Gives information about the server the command was used in")
            message.channel.send(tempError)
        }
            break;
    }
}
