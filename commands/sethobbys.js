const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');

module.exports = {
    name: 'sethobbys',
    description: 'Damit kannst du deine Hobbys auf deinem Steckbrief anpassen',
    category: 'Steckbriefe',
    usage: '``c!sethobbys [hobbys]``',
    execute(arguments, receivedMessage) {
        if (arguments.length == 0) {
            receivedMessage.reply("du musst schon sagen, was deine Hobbys sein sollen.")
            return
        }
        var newhobbys = receivedMessage.content.substr(12).replace(/\\n/g, "");
        if (newhobbys > 300) {
            receivedMessage.reply("deine Hobbys dürfen nicht länger als 300 Zeichen lang sein xD.")
            return
        }
        var usid = receivedMessage.author.id
        con.query("SELECT hobbys, id FROM userdata WHERE usrid = '" + usid + "'", function (err, result, fields) {
            if (err) throw err;
            con.query("UPDATE `cerbotdb`.`userdata` SET `hobbys`='" + newhobbys + "' WHERE  `id`=" + result[0].id + ";")
        });
        receivedMessage.reply("du hast deine Hobbys erfolgreich geändert. Du kannst dir deinen Steckbrief mit c!userinfo anzeigen lassen c:")
        receivedMessage.delete();
        const lt = require('./../bot.js');
        lt.logging("0x87CEEB", "Steckbriefsystem", "Ein Logeintrag zum Steckbriefsystem", "Hobbys wurden geändert",
            "" + receivedMessage.author + " (ID: ``" + receivedMessage.author.id + "``) hat seine/ihre Hobbys zu ``" + newhobbys + "`` geändert.");
    },
};