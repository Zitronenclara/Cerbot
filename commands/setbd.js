const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');

module.exports = {
    name: 'setbd',
    description: 'Damit kannst du dein Geburtsdatum auf deinem Steckbrief anpassen',
    category: 'Steckbriefe',
    usage: '``c!setbd [geburtstag]``',
    execute(arguments, receivedMessage) {
        if (arguments.length == 0) {
            receivedMessage.reply("du musst schon sagen, was dein Geburtstag sein soll.")
            return
        }
        var newbd = receivedMessage.content.substr(8).replace(/\\n/g, "");
        if (newbd.length > 50) {
            receivedMessage.reply("dein Geburtstag darf nicht länger als 50 Zeichen lang sein uwu Warum auch xD.")
            return
        }
        var usid = receivedMessage.author.id
        con.query("SELECT birthday, id FROM userdata WHERE usrid = '" + usid + "'", function (err, result, fields) {
            if (err) throw err;
            con.query("UPDATE `cerbotdb`.`userdata` SET `birthday`='" + newbd + "' WHERE  `id`=" + result[0].id + ";")
        });
        receivedMessage.reply("du hast deinen Geburtstag erfolgreich geändert. Du kannst dir deinen Steckbrief mit c!userinfo anzeigen lassen c:")
        receivedMessage.delete();
        const lt = require('./../bot.js');
        lt.logging("0x87CEEB", "Steckbriefsystem", "Ein Logeintrag zum Steckbriefsystem", "Geburtstag wurde geändert",
            "" + receivedMessage.author + " (ID: ``" + receivedMessage.author.id + "``) hat seinen/ihren Geburtstag zu ``" + newbd + "`` geändert.");
    },
};