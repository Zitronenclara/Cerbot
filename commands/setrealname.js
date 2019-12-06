const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');

module.exports = {
    name: 'setrealname',
    description: 'Damit kannst du deinen echten Namen auf deinem Steckbrief anpassen',
    category: 'Steckbriefe',
    usage: '``c!setrealname [name]``',
    execute(arguments, receivedMessage) {
        if (arguments.length == 0) {
            receivedMessage.reply("du musst schon sagen, was dein neuer Name sein soll.")
            return
        }
        var newrealname = receivedMessage.content.substr(14).replace(/\\n/g, "");
        if (newrealname.length > 50) {
            receivedMessage.reply("dein Name darf nicht länger als 50 Zeichen lang sein uwu Shit happens.")
            return
        }
        var usid = receivedMessage.author.id
        con.query("SELECT realname, id FROM userdata WHERE usrid = '" + usid + "'", function (err, result, fields) {
            if (err) throw err;
            con.query("UPDATE `cerbotdb`.`userdata` SET `realname`='" + newrealname + "' WHERE  `id`=" + result[0].id + ";")
        });
        receivedMessage.reply("du hast deinen Namen erfolgreich geändert. Du kannst dir deinen Steckbrief mit c!userinfo anzeigen lassen c:")
        receivedMessage.delete();
        const lt = require('./../bot.js');
        lt.logging("0x87CEEB", "Steckbriefsystem", "Ein Logeintrag zum Steckbriefsystem", "echter Name wurde geändert",
            "" + receivedMessage.author + " (ID: ``" + receivedMessage.author.id + "``) hat seinen/ihren echten Namen zu ``" + newrealname + "`` geändert.");
    },
};