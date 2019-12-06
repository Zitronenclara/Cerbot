const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');

module.exports = {
    name: 'setsize',
    description: 'Damit kannst du deine Körpergröße auf deinem Steckbrief anpassen',
    category: 'Steckbriefe',
    usage: '``c!setsize [körpergröße]``',
    execute(arguments, receivedMessage) {
        if (arguments.length == 0) {
            receivedMessage.reply("du musst schon sagen, was deine Körpergröße sein soll.")
            return
        }
        var newsize = receivedMessage.content.substr(10).replace(/\\n/g, "");
        if (newsize > 50) {
            receivedMessage.reply("deine Körpergröße darf nicht länger als 50 Zeichen lang sein xD.")
            return
        }
        var usid = receivedMessage.author.id
        con.query("SELECT size, id FROM userdata WHERE usrid = '" + usid + "'", function (err, result, fields) {
            if (err) throw err;
            con.query("UPDATE `cerbotdb`.`userdata` SET `size`='" + newsize + "' WHERE  `id`=" + result[0].id + ";")
        });
        receivedMessage.reply("du hast deine Körpergröße erfolgreich geändert. Du kannst dir deinen Steckbrief mit c!userinfo anzeigen lassen c:")
        receivedMessage.delete();
        const lt = require('./../bot.js');
        lt.logging("0x87CEEB", "Steckbriefsystem", "Ein Logeintrag zum Steckbriefsystem", "Körpergröße wurde geändert",
            "" + receivedMessage.author + " (ID: ``" + receivedMessage.author.id + "``) hat seine/ihre Körpergröße zu ``" + newsize + "`` geändert.");
    },
};