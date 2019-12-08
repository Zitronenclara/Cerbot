const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');

module.exports = {
    name: 'divorce',
    description: 'Damit lässt du dich von deinem aktuellen Ehepartner scheiden :c',
    category: 'Sonstiges',
    usage: '``c!divorce``',
    execute(arguments, receivedMessage) {
        con.query("SELECT id, married, marrystamp FROM userdata WHERE usrid = '" + receivedMessage.author.id + "'", function (err, result, fields) {
            if (result[0].marrystamp == 0) {
                receivedMessage.reply("du bist nicht mal verheiratet uwu")
                return
            }
            receivedMessage.channel.send(receivedMessage.author + ", bist du dir sicher, dass du dich von <@" + result[0].married + "> trennen willst :c")
                .then(message => {
                    message.react('✅').then(() => message.react('❌'));
                    const filter = (reaction, user) => {
                        return ['✅', '❌'].includes(reaction.emoji.name) && user.id === receivedMessage.author.id;
                    };
                    message.awaitReactions(filter, {
                            max: 1,
                            time: 30000,
                            errors: ['time'],
                        })
                        .then((collected) => {
                            if (collected.first().emoji.name === '✅') {
                                var newstatus = "single"
                                var newstamp = 0
                                var partner = result[0].married
                                con.query("UPDATE `cerbotdb`.`userdata` SET `married`='" + newstatus + "' WHERE  `id`=" + result[0].id + ";")
                                con.query("UPDATE `cerbotdb`.`userdata` SET `marrystamp`=" + newstamp + " WHERE  `id`=" + result[0].id + ";")
                                con.query("SELECT id, married, marrystamp FROM userdata WHERE usrid = '" + partner + "'", function (err, result, fields) {
                                    if (err) throw err;
                                    con.query("UPDATE `cerbotdb`.`userdata` SET `married`='" + newstatus + "' WHERE  `id`=" + result[0].id + ";")
                                    con.query("UPDATE `cerbotdb`.`userdata` SET `marrystamp`=" + newstamp + " WHERE  `id`=" + result[0].id + ";")
                                });
                                receivedMessage.reply("ihr habt euch erfolgreich getrennt :c")
                            } else if (collected.first().emoji.name === '❌') {
                                message.channel.send("Die Trennung wurde abgebrochen c: yay");
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                            message.channel.send(`Die Trennung ist abgelaufen`);
                        })
                })
        });
    },
};