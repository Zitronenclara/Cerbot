const fs = require('fs');
global.discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');

module.exports = {
    name: 'downhp',
    description: 'Damit kannst du gekaufte HP-Punkte wieder gegen Seelen umtauschen',
    category: 'Kampfsystem',
    usage: '``c!downhp [anzahl]``',
    execute(arguments, receivedMessage) {
        var downing = parseFloat(arguments.find(arg => !/<@!?\d+>/g.test(arg)), 0);
        var downinga = arguments.find(arg => !/<@!?\d+>/g.test(arg))
        if (!downing || isNaN(downing)) {
            receivedMessage.channel.send("``" + downinga + "`` ist keine valide Menge " + receivedMessage.author + ".")
            return
        }
        con.query("SELECT maxhp, coins, coinsspent FROM userdata WHERE usrid = '" + receivedMessage.author.id + "'", function (err, result, fields) {
            if (err) throw err;
            var aktumaxhp = result[0].maxhp;
            var newmaxhp = (aktumaxhp - downing)
            if (aktumaxhp == 30) {
                receivedMessage.channel.send(receivedMessage.author + ", du kannst deine maximalen HP aktuell nicht downgraden, da du bereits das Minuimum an maximalen HP besitzt.")
                return
            }
            if (newmaxhp < 30) {
                receivedMessage.channel.send(receivedMessage.author + ", nach deinem Downgrade musst du noch **mindestens 30 maximale HP** haben. Du kannst aktuell nur **" + (aktumaxhp - 30) + "** HP-Punkte downgraden.")
                return
            }
            var gets = (downing * 90);
            var aktucoins = result[0].coins;
            var aktuspent = result[0].coinsspent;
            receivedMessage.channel.send(receivedMessage.author + ", wenn du **" + downing + "** HP-Punkte abgibst, würdest du **" + gets + "**❦ gutgeschrieben bekommen. Dannach hast du allerdings nurnoch **" + newmaxhp + "** maximale HP. Bist du damit einverstanden?")
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
                                con.query("UPDATE `cerbotdb`.`userdata` SET `maxhp`=" + newmaxhp + " WHERE `usrid`=" + receivedMessage.author.id + ";")
                                con.query("UPDATE `cerbotdb`.`userdata` SET `coins`=" + (aktucoins + gets) + " WHERE `usrid`=" + receivedMessage.author.id + ";")
                                con.query("UPDATE `cerbotdb`.`userdata` SET `coinsspent`=" + (aktuspent - gets) + " WHERE `usrid`=" + receivedMessage.author.id + ";")
                                receivedMessage.channel.send(receivedMessage.author + ", deine maximalen HP wurden von **" + aktumaxhp + "** um **" + downing + "** auf **" + newmaxhp + "** HP gesenkt. Dir wurden **" + gets + "**❦ gutgeschrieben.")
                                const lt = require('./../bot.js');
                                lt.logging("0xFF4500", "Downgrade-System", "Ein Logeintrag zum Downgrade-System", "Stats wurden gedowngradet",
                                    "" + receivedMessage.author + " (ID: ``" + receivedMessage.author.id + "``) hat seine/ihre HP-Stats von **" + aktumaxhp + "** um **" + downing + "** auf **" + newmaxhp + "** gedowngradet. Ihm/Ihr wurden **" + gets + "**❦ übertragen.");
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