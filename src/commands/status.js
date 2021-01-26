import {getGuild} from "../util/discord";
import {BOT_PREFIX} from "../env";
import {loadStringList} from "../files"

let statuses = loadStringList('statuses.txt')

export let updateStatus = async (bot) => {
    const index = Math.floor(Math.random() * (statuses.length - 1) + 1);
    bot.user.setActivity(statuses[index])
}
