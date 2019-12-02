const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');

module.exports = {
    name: 'setdesc',
    description: 'Sets your desc',
    execute(arguments, receivedMessage) {
        if (arguments.length == 0) {
            receivedMessage.reply("du musst schon sagen, was deine Beschreibung sein soll.")
            return
        }
        var newdesc = receivedMessage.content.substr(10)
        if (newdesc > 300) {
            receivedMessage.reply("deine Beschreibung darf nicht länger als 300 Zeichen lang sein xD.")
            return
        }
        var usid = receivedMessage.author.id
        con.query("SELECT selfdesc, id FROM userdata WHERE usrid = '" + usid + "'", function (err, result, fields) {
            if (err) throw err;
            con.query("UPDATE `cerbotdb`.`userdata` SET `selfdesc`='" + newdesc + "' WHERE  `id`=" + result[0].id + ";")
        });
        receivedMessage.reply("du hast deine Beschreibung erfolgreich geändert. Du kannst dir deinen Steckbrief mit c!userinfo anzeigen lassen c:")
        receivedMessage.delete();
        const lt = require('./../bot.js');
        lt.logging("0x87CEEB", "Steckbriefsystem", "Ein Logeintrag zum Steckbriefsystem", "Beschreibung wurden geändert",
            "" + receivedMessage.author + " (ID: ``" + receivedMessage.author.id + "``) hat seine/ihre Beschreibung zu ``" + newdesc + "`` geändert.");
    },
};