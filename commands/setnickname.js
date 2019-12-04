const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');

module.exports = {
    name: 'setnickname',
    description: 'Sets your nickname',
    execute(arguments, receivedMessage) {
        if (arguments.length == 0) {
            receivedMessage.reply("du musst schon sagen, was dein Spitzname sein soll.")
            return
        }
        var newnickname = receivedMessage.content.substr(14).replace(/\\n/g, "");
        if (newnickname.length > 50) {
            receivedMessage.reply("dein Spitzname darf nicht länger als 50 Zeichen lang sein uwu Shit happens.")
            return
        }
        var usid = receivedMessage.author.id
        con.query("SELECT nickname, id FROM userdata WHERE usrid = '" + usid + "'", function (err, result, fields) {
            if (err) throw err;
            con.query("UPDATE `cerbotdb`.`userdata` SET `nickname`='" + newnickname + "' WHERE  `id`=" + result[0].id + ";")
        });
        receivedMessage.reply("du hast deinen Spitznamen erfolgreich geändert. Du kannst dir deinen Steckbrief mit c!userinfo anzeigen lassen c:")
        receivedMessage.delete();
        const lt = require('./../bot.js');
        lt.logging("0x87CEEB", "Steckbriefsystem", "Ein Logeintrag zum Steckbriefsystem", "Spitzname wurde geändert",
            "" + receivedMessage.author + " (ID: ``" + receivedMessage.author.id + "``) hat seinen/ihren Spitznamen zu ``" + newnickname + "`` geändert.");
    },
};