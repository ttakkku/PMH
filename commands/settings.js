/**
 * @name Seoa:settings
 * @description settings Command
 */

const i18n = require('i18n')

exports.run = async (seoa, msg, query) => {
  let server = await seoa.db.select('serverdata', { id: msg.guild.id })
  server = server[0]
    if (query.args[0]) {
      if (['lang', '언어'].includes(query.args[0].toLowerCase())) {
        if (
          !(
            query.args[1] === 'kor' ||
            query.args[1] === 'en' ||
            query.args[1] === 'pt'
          )
        ) {
          seoa.db.update('serverdata', { lang: server.en }, { id: msg.guild.id })
          msg.channel.send(
            i18n.__({
              phrase: 'ENMSG',
              locale: server.lang
            })
          )
        } else {
          seoa.db.update('serverdata', { lang: query.args[1] }, { id: msg.guild.id })
          msg.channel.send(
            i18n.__(
              { phrase: 'Lang', locale: server.lang },
              query.args[1]
            )
          )
        }
      } else if (['channel', '채널'].includes(query.args[0].toLowerCase())) {
        seoa.db.update('serverdata', { channelnoticeid: msg.mentions.channels.firstKey() }, { id: msg.guild.id })
        msg.channel.send(
          i18n.__({ phrase: 'su', locale: server.lang })
        )
      }
    } else {
      msg.channel.send(
        i18n.__({ phrase: 'ch', locale: server.lang })
      )
    }
}

exports.callSign = ['settings', 'setting', '설정']
exports.helps = {
  description: '서버 설정을 합니다.',
  uses: 'settings',
  permission: 'ADMINISTRATOR'
}
