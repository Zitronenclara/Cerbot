const fs = require('fs');
global.discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');

module.exports = {
    name: 'transfer',
    description: 'transfers souls to other users!',
    execute(arguments, receivedMessage) {
        var transc = parseFloat(arguments.find(arg => !/<@!?\d+>/g.test(arg)), 0);
        var transb = arguments.find(arg => !/<@!?\d+>/g.test(arg));
        var target = receivedMessage.mentions.users.first();
        if (target.bot) {
            receivedMessage.channel.send(receivedMessage.author + ", du kannst einem Bot keine Seelen überweisen")
            return
        }
        if (!transc || isNaN(transc)) {
            receivedMessage.channel.send("``" + transb + "`` ist keine gültige Übertragungsmenge " + receivedMessage.author + ". Das muss eine Zahl sein, die größer oder gleich 10 ist.")
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
        });
        if (target.id == receivedMessage.author.id) {
            receivedMessage.channel.send(receivedMessage.author + " hast du keine Freunde? owo Du kannst dir selbst keine Seelen überweisen, sorry xD")
            return
        }
        con.query("SELECT id ,coins, coinstrans FROM userdata WHERE usrid = '" + receivedMessage.author.id + "'", function (err, result, fields) {
            if (err) throw err;
            var aktucoins = result[0].coins
            var instrans = result[0].coinstrans
            if (transc < 10) {
                receivedMessage.channel.send("Du musst mehr als 9 Seelen übertragen " + receivedMessage.author + ".")
                return
            }
            if (aktucoins < transc) {
                receivedMessage.channel.send("Du hast nich so viele Seelen " + receivedMessage.author + ".")
                return
            }
            receivedMessage.channel.send(target + ", nimmst du die **" + transc + "**❦ von " + receivedMessage.author + " an? Nach einer Minute verfällt der Transfer.")
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
                                con.query("UPDATE `cerbotdb`.`userdata` SET `coins`=" + (aktucoins - transc) + " WHERE  `id`=" + result[0].id + ";")
                                con.query("UPDATE `cerbotdb`.`userdata` SET `coinstrans`=" + (instrans + transc) + " WHERE  `id`=" + result[0].id + ";")
                                receivedMessage.channel.send(receivedMessage.author + " du hast dir **" + transc + "**❦ herausgerissen, und sie " + target + " in den Rachen geschoben.")
                                con.query("SELECT id ,coins, coinstransget FROM userdata WHERE usrid = '" + target.id + "'", function (err, result, fields) {
                                    if (err) throw err;
                                    var aktucoinsb = result[0].coins
                                    var instransget = result[0].coinstransget
                                    con.query("UPDATE `cerbotdb`.`userdata` SET `coins`=" + (aktucoinsb + transc) + " WHERE  `id`=" + result[0].id + ";")
                                    con.query("UPDATE `cerbotdb`.`userdata` SET `coinstransget`=" + (instransget + transc) + " WHERE  `id`=" + result[0].id + ";")
                                    const lt = require('./../bot.js');
                                    lt.logging("0xFFFFFF", "Währungssystem", "Ein Logeintrag zum Währungssystem", "Seelen wurden übertragen",
                                        "" + receivedMessage.author + " (ID: ``" + receivedMessage.author.id + "``) hat " + target + " (ID: ``" + target.id + "``) **" + transc + "**❦ übertragen.");
                                });
                            } else if (collected.first().emoji.name === '❌') {
                                message.channel.send("Die Seelen wurden abgelehnt " + receivedMessage.author + ".");
                            }
                        })
                        .catch(() => {
                            message.channel.send(`Keine Reaktion, der Transfer wurde abgebrochen.`);
                        })
                })
        });
    }
};