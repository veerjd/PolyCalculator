const dbServers = require('../util/dbServers')

module.exports = {
  name: 'addbotchannel',
  description: 'add the pinged bot channel as a registered channel.\nA registered channel will prevent the bot\'s replies from auto-deleting.',
  aliases: ['abc', 'add'],
  shortUsage(prefix) {
    return `${prefix}abc #bot-commands`
  },
  longUsage(prefix) {
    return `${prefix}addbotcchannel #bot-commands`
  },
  forceNoDelete: false,
  category: 'Settings',
  permsAllowed: ['MANAGE_GUILD', 'ADMINISTRATOR'],
  usersAllowed: ['217385992837922819'],
  // eslint-disable-next-line no-unused-vars
  execute: async function (message, argsStr, replyData, dbData) {
    const channelToAdd = message.mentions.channels.first()

    try {
      if (channelToAdd) {
        const newBotChannelsArray = await dbServers.addABotChannel(message.guild.id, channelToAdd.id, message.guild.name)
        const returnedArray = '<#' + newBotChannelsArray.join('>,\n<#') + '>'
        replyData.content.push([`The channel ${channelToAdd} was added!\nHere's the new list of registered bot channels:\n` + returnedArray, {}])
        return replyData
      } else {
        const botChannelsArray = await dbServers.getBotChannels(message.guild.id, message.guild.name, '(addbotchannel cmd, no args)')
        const returnedArray = '<#' + botChannelsArray.join('>,\n<#') + '>'
        replyData.content.push(['You need to ping a channel to register it.\nHere are the current registered bot channels that will auto-show the :wastebasket: emoji:\n' + returnedArray, {}])
        return replyData
      }
    } catch (err) {
      throw err
    }
  }
};