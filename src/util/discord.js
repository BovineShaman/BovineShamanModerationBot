import {bot} from "../index";
import {GUILD_BOT_CHANNEL_ID, GUILD_ID, GUILD_CRAWLER_REPORT_CHANNEL_ID, GUILD_MOD_REPORT_CHANNEL_ID} from "../env";

export function getGuild() {
    return bot.guilds.get(GUILD_ID)
}

export function getBotSpamChannel() {
    return getGuild().channels.get(GUILD_BOT_CHANNEL_ID)
}

export function codeBlock(text, lang = '') {
    return "```" + lang + '\n' + text + '\n' + "```"
}

export function code(text) {
    return "`" + text + "`"
}

export function getCrawlerReportChannel() {
    return getGuild().channels.get(GUILD_CRAWLER_REPORT_CHANNEL_ID)
}

export function getModReportChannel() {
    return getGuild().channels.get(GUILD_MOD_REPORT_CHANNEL_ID)
}

export async function getMember(user) {
    return getGuild().fetchMember(user)
}
