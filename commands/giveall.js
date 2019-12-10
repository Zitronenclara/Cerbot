const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');

module.exports = {
    name: 'giveall',
    description: 'Gibt jedem User eine beliebige Anzahl an Seelen',
    category: 'Admin',
    usage: '``c!giveall [anzahl]``',
    execute(arguments, receivedMessage) {
        if (receivedMessage.author.id == "422716344228642828") {
            var givec = parseFloat(arguments.find(arg => !/<@!?\d+>/g.test(arg)), 0);
            con.query("SELECT id ,coins, coinsget FROM userdata", function (err, result, fields) {
                if (err) throw err;
                receivedMessage.reply("jedem User werden jetzt **"+givec+"**❦ geschenkt...")
                var aktucoins = 0
                var newcoins = 0
                var aktucoinsget = 0
                var newaktucoinsget = 0
                for (i = 0; i < result.length; i++) {
                    aktucoins = result[i].coins
                    newcoins = aktucoins + givec
                    aktucoinsget = result[i].coinsget
                    newaktucoinsget = aktucoinsget + givec
                    con.query("UPDATE `cerbotdb`.`userdata` SET `coins`=" + newcoins + " WHERE  `id`=" + result[i].id + ";")
                    con.query("UPDATE `cerbotdb`.`userdata` SET `coinsget`=" + newaktucoinsget + " WHERE  `id`=" + result[i].id + ";")
                }
                receivedMessage.channel.send("Erfolgreich abgeschlossen!")
                const lt = require('./../bot.js');
                lt.logging("0x0000FF", "Währungssystem", "Ein Logeintrag zum Währungssystem", "Jedem wurden Seelen gegeben",
                    "" + receivedMessage.author + " (ID: ``" + receivedMessage.author.id + "``) hat jedem User **"+givec+"**❦ gegeben.");
            });
        }
    },
};