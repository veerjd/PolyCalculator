const { MessageEmbed, Collection } = require('discord.js')

module.exports.buildEmbed = function (data) {
  const embed = new MessageEmbed().setColor('#ff0066')
  if (data.title)
    embed.setTitle(data.title)
  if (data.description)
    embed.setDescription(data.description)
  if (data.fields)
    data.fields.forEach(el => {
      embed.addField(el.name, el.value)
    })

  return embed
}

module.exports.saveStats = function (data, db) {
  const sql = 'INSERT INTO stats (content, author_id, author_tag, command, attacker, defender, url, message_id, server_id, will_delete, attacker_description, defender_description, reply_fields, arg) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)'
  const values = [data.content, data.author_id, data.author_tag, data.command, data.attacker, data.defender, data.url, data.message_id, data.server_id, data.will_delete, data.attacker_description, data.defender_description, data.reply_fields, data.arg]
  db.query(sql, values)
}

module.exports.logUse = function (message, logChannel) {
  let content
  if (message.cleanContent.length > 256)
    content = message.cleanContent.slice(0, 255)
  else
    content = message.cleanContent

  const logData = {
    title: `**${content}**`,
    description: ` in **${message.guild.name.toUpperCase()}**\nin ${message.channel} (#${message.channel.name})\nby ${message.author} (${message.author.tag})\n${message.url}`
  }
  const newEmbed = module.exports.buildEmbed(logData)
  logChannel.send(newEmbed)
}

module.exports.milestoneMsg = async function (message, db, newsChannel, meee) {
  let { rows } = await db.query('SELECT COUNT(st.id) AS "triggers" FROM stats st JOIN servers se ON se.server_id = st.server_id')

  rows = rows[0]
  rows.triggers = parseInt(rows.triggers)

  if (rows.triggers % 50000 === 0) {
    newsChannel.send(`<:yay:585534167274618997>:tada: Thanks to ${message.author} (${message.author.username}), we reached ${rows.triggers} uses! :tada:<:yay:585534167274618997>`)
    meee.send(`<:yay:585534167274618997>:tada: Thanks to ${message.author} (${message.author.username}), we reached **${rows.triggers}** uses! :tada:<:yay:585534167274618997>`)
  }
}

module.exports.handleAliases = function (array) {
  const newArray = array

  const aliases = aliasMap.keyArray()

  if (aliases.some(alias => array.some(str => str.toLowerCase().startsWith(alias)))) {
    const index = array.findIndex(el => aliases.some(alias => alias === el.substring(0, 3).toLowerCase()))
    if (index === -1)
      return

    const openedAlias = aliasMap.get(array[index].substring(0, 3).toLowerCase())
    if (openedAlias[1])
      newArray.splice(index, 1, openedAlias[0], openedAlias[1])
    else
      newArray.splice(index, 1, openedAlias[0])
  }

  return newArray
}

const aliasMap = new Collection()

aliasMap.set('dbs', ['nb'])
aliasMap.set('dsh', ['nb'])
aliasMap.set('dbo', ['nb'])

aliasMap.set('gbs', ['nb'])
aliasMap.set('gsh', ['nb'])
aliasMap.set('gbo', ['nb'])

aliasMap.set('wbs', ['nb'])
aliasMap.set('wsh', ['nb'])
aliasMap.set('wbo', ['nb'])

aliasMap.set('kbs', ['nb'])
aliasMap.set('ksh', ['nb'])
aliasMap.set('kbo', ['nb'])

aliasMap.set('dd', ['nb', 'd'])
aliasMap.set('dw', ['nb', 'w'])

aliasMap.set('wd', ['nb', 'd'])
aliasMap.set('ww', ['nb', 'w'])

aliasMap.set('wa', ['nb'])
aliasMap.set('ri', ['nb'])
aliasMap.set('ar', ['nb'])
aliasMap.set('de', ['nb'])
aliasMap.set('kn', ['nb'])
aliasMap.set('sw', ['nb'])
aliasMap.set('ca', ['nb'])
aliasMap.set('gi', ['nb'])
aliasMap.set('cr', ['nb'])
aliasMap.set('tr', ['nb'])
aliasMap.set('po', ['nb'])
aliasMap.set('na', ['nb'])
aliasMap.set('ga', ['nb'])
aliasMap.set('mb', ['nb'])
aliasMap.set('eg', ['nb'])
aliasMap.set('bd', ['nb'])
aliasMap.set('dr', ['nb'])
aliasMap.set('mo', ['nb'])
aliasMap.set('sl', ['nb'])
aliasMap.set('if', ['nb'])