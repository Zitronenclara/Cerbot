const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');

module.exports = {
    name: 'setfavcol',
    description: 'Damit kannst du deine Lieblingsfarbe auf deinem Steckbrief anpassen',
    category: 'Steckbriefe',
    usage: '``c!setfavcol [lieblingsfarbe]``',
    execute(arguments, receivedMessage) {
        if (arguments.length == 0) {
            receivedMessage.reply("du musst schon sagen, was deine Lieblingsfarbe sein soll.")
            return
        }
        var newfavcol = receivedMessage.content.substr(12).replace(/\\n/g, "").replace(/\\r/g, "");
        if (newfavcol.length > 50) {
            receivedMessage.reply("deine Lieblingsfarbe darf nicht länger als 50 Zeichen lang sein uwu Gibt es überhaupt Farben, die so einen langen Namen haben? xD.")
            return
        }
        var usid = receivedMessage.author.id
        con.query("SELECT favcol, id FROM userdata WHERE usrid = '" + usid + "'", function (err, result, fields) {
            if (err) throw err;
            con.query("UPDATE `cerbotdb`.`userdata` SET `favcol`='" + newfavcol + "' WHERE  `id`=" + result[0].id + ";")
        });
        receivedMessage.reply("du hast deine Lieblingsfarbe erfolgreich geändert. Du kannst dir deinen Steckbrief mit c!userinfo anzeigen lassen c:")
        receivedMessage.delete();
        const lt = require('./../bot.js');
        lt.logging("0x87CEEB", "Steckbriefsystem", "Ein Logeintrag zum Steckbriefsystem", "Lieblingsfarbe wurde geändert",
            "" + receivedMessage.author + " (ID: ``" + receivedMessage.author.id + "``) hat seine/ihre Lieblingsfarbe zu ``" + newfavcol + "`` geändert.");
    },
};