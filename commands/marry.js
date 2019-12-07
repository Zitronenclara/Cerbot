const fs = require('fs');
global.discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');
const vergeben = new Set();

module.exports = {
    name: 'marry',
    description: 'Macht einem beliebigen User einen Heiratsantrag',
    category: 'Sonstiges',
    usage: '``c!marry``, ``c!marry @user``',
    execute(arguments, receivedMessage) {
        con.query("SELECT id, married, marrystamp FROM userdata WHERE usrid = '" + receivedMessage.author.id + "'", function (err, result, fields) {
            if (result[0].married == null || result[0].married == "single") {
                var target = receivedMessage.mentions.users.first();
                if (!target) {
                    receivedMessage.reply("du bist aktuell nicht verheiratet uwu Du musst mir schon sagen, wen du heiraten willst c:")
                    return
                }
                if (target == receivedMessage.author) {
                    receivedMessage.reply("du kannst dich nicht selbst heiraten xD Sei nicht traurig, irgendwann wird auch dein Moment kommen c:")
                    return
                }
                if (target.bot){
                    receivedMessage.reply("du kannst keinen Bot heiraten.")
                    return
                }
                con.query("SELECT * FROM userdata WHERE usrid = '" + target.id + "'", function (err, result, fields) {
                    if (err) throw err;
                    var udat = result
                    if (udat = undefined || udat.length == 0) {
                        var initid = "" + target.id + ""
                        var sql = "INSERT INTO userdata (usrid, coins, coinsget, coinsspent, coinstrans, coinstransget, xdcount, uwucount, owocount, advget, earnedc) VALUES (" + initid + ", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)";
                        con.query(sql, function (err, result) {
                            if (err) throw err;
                            console.log("User " + initid + " added to the Database");
                        });
                    }
                    if (result[0].marrystamp !== 0) {
                        receivedMessage.reply("leider ist " + target + " schon vergeben uwu")
                        vergeben.add(target.id)
                    }
                });
                if (!vergeben.has(target.id)) {
                    vergeben.delete(target.id)
                    return
                }
                receivedMessage.channel.send(":heart:" + target + ", willst du " + receivedMessage.author + " heiraten? :heart:")
                    .then(message => {
                        message.react('✅').then(() => message.react('❌'));
                        const filter = (reaction, user) => {
                            return ['✅', '❌'].includes(reaction.emoji.name) && user.id === target.id;
                        };
                        message.awaitReactions(filter, {
                                max: 1,
                                time: 30000,
                                errors: ['time'],
                            })
                            .then((collected) => {
                                if (collected.first().emoji.name === '✅') {
                                    con.query("UPDATE `cerbotdb`.`userdata` SET `married`='" + target.id + "' WHERE  `id`=" + result[0].id + ";")
                                    receivedMessage.channel.send(receivedMessage.author + " und " + target + ", ihr dürft euch jetzt :PandaKiss:").then(hmes => {
                                        var time = hmes.createdTimestamp
                                        con.query("UPDATE `cerbotdb`.`userdata` SET `marrystamp`=" + time + " WHERE  `id`=" + result[0].id + ";")
                                        con.query("SELECT id ,coins, coinstransget FROM userdata WHERE usrid = '" + target.id + "'", function (err, result, fields) {
                                            if (err) throw err;
                                            con.query("UPDATE `cerbotdb`.`userdata` SET `married`='" + receivedMessage.author.id + "' WHERE  `id`=" + result[0].id + ";")
                                            con.query("UPDATE `cerbotdb`.`userdata` SET `marrystamp`=" + time + " WHERE  `id`=" + result[0].id + ";")
                                        });
                                    })
                                } else if (collected.first().emoji.name === '❌') {
                                    message.channel.send("Dein Heiratsantrag wurde abgelehnt :c");
                                }
                            })
                            .catch((err) => {
                                console.log(err)
                                message.channel.send(`Keine Antwort uwu Auch irgendwie sad`);
                            })
                    })
            } else {
                receivedMessage.reply("du bist bereits verheiratet.")
            }
        });
    },
}