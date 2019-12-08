const fs = require('fs');
global.discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');

module.exports = {
    name: 'downatk',
    description: 'Damit kannst du gekaufte Angriffspunkte wieder gegen Seelen umtauschen',
    category: 'Kampfsystem',
    usage: '``c!downatk [anzahl]``',
    execute(arguments, receivedMessage) {
        var downing = parseFloat(arguments.find(arg => !/<@!?\d+>/g.test(arg)), 0);
        var downinga = arguments.find(arg => !/<@!?\d+>/g.test(arg))
        if (!downing || isNaN(downing)) {
            receivedMessage.channel.send("``" + downinga + "`` ist keine valide Menge " + receivedMessage.author + ".")
            return
        }
        con.query("SELECT power, coins, coinsspent FROM userdata WHERE usrid = '" + receivedMessage.author.id + "'", function (err, result, fields) {
            if (err) throw err;
            var aktupower = (result[0].power + 5);
            var newpower = (aktupower - (downing + 5))
            if (aktupower == 5) {
                receivedMessage.channel.send(receivedMessage.author + ", du kannst deine Angriffspunkte aktuell nicht downgraden, da du bereits das Minuimum an Angriffspunkten besitzt.")
                return
            }
            if (newpower < 0) {
                receivedMessage.channel.send(receivedMessage.author + ", nach deinem Downgrade musst du noch **mindestens 5 Angriffspunkte** haben. Du kannst aktuell nur **" + (aktupower - 5) + "** ATK-Punkte downgraden.")
                return
            }
            var gets = (downing * 250);
            var aktucoins = result[0].coins;
            var aktuspent = result[0].coinsspent;
            receivedMessage.channel.send(receivedMessage.author + ", wenn du **" + downing + "** Angriffspunkte abgibst, würdest du **" + gets + "**❦ gutgeschrieben bekommen. Dannach hast du allerdings nurnoch **" + (newpower + 5) + "** Angriffspunkte. Bist du damit einverstanden?")
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
                                con.query("UPDATE `cerbotdb`.`userdata` SET `power`=" + newpower + " WHERE `usrid`=" + receivedMessage.author.id + ";")
                                con.query("UPDATE `cerbotdb`.`userdata` SET `coins`=" + (aktucoins + gets) + " WHERE `usrid`=" + receivedMessage.author.id + ";")
                                con.query("UPDATE `cerbotdb`.`userdata` SET `coinsspent`=" + (aktuspent - gets) + " WHERE `usrid`=" + receivedMessage.author.id + ";")
                                receivedMessage.channel.send(receivedMessage.author + ", deine Angriffspunkte wurden von **" + aktupower + "** um **" + downing + "** auf **" + (newpower + 5) + "** Angriffspunkte gesenkt. Dir wurden **" + gets + "**❦ gutgeschrieben.")
                                const lt = require('./../bot.js');
                                lt.logging("0xFF4500", "Downgrade-System", "Ein Logeintrag zum Downgrade-System", "Stats wurden gedowngradet",
                                    "" + receivedMessage.author + " (ID: ``" + receivedMessage.author.id + "``) hat seine/ihre ATK-Stats von **" + aktupower + "** um **" + downing + "** auf **" + (newpower + 5) + "** gedowngradet. Ihm/Ihr wurden **" + gets + "**❦ übertragen.");
                            } else if (collected.first().emoji.name === '❌') {
                                message.channel.send(`Der Downgrade wurde abgebrochen!`);
                            }
                        })
                        .catch(() => {
                            message.channel.send(`Keine Antwort, die Downgrade-Anfrage wurde geschlossen.`);
                        })
                })
        })
    }
}