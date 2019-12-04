const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');

module.exports = {
    name: 'setgender',
    description: 'Sets your gender',
    execute(arguments, receivedMessage) {
        if (arguments.length == 0) {
            receivedMessage.reply("du musst schon sagen, was dein Geschlecht sein soll.")
            return
        }
        var newgender = receivedMessage.content.substr(12).replace(/\\n/g, "");
        if (newgender > 50) {
            receivedMessage.reply("dein Geschlecht darf nicht länger als 50 Zeichen lang sein xD.")
            return
        }
        var usid = receivedMessage.author.id
        con.query("SELECT gender, id FROM userdata WHERE usrid = '" + usid + "'", function (err, result, fields) {
            if (err) throw err;
            con.query("UPDATE `cerbotdb`.`userdata` SET `gender`='" + newgender + "' WHERE  `id`=" + result[0].id + ";")
        });
        receivedMessage.reply("du hast dein Geschlecht erfolgreich geändert. Du kannst dir deinen Steckbrief mit c!userinfo anzeigen lassen c:")
        receivedMessage.delete();
        const lt = require('./../bot.js');
        lt.logging("0x87CEEB", "Steckbriefsystem", "Ein Logeintrag zum Steckbriefsystem", "Geschlecht wurde geändert",
            "" + receivedMessage.author + " (ID: ``" + receivedMessage.author.id + "``) hat sein/ihr Geschlecht zu ``" + newgender + "`` geändert.");
    },
};