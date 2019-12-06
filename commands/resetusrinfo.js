const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');

module.exports = {
    name: 'resetusrinfo',
    description: 'Setzt den Steckbrief eines beliebigen Users zurück',
    category: 'Admin',
    usage: '``c!resetusrinfo @user``',
    execute(arguments, receivedMessage) {
        if (receivedMessage.author.id == "422716344228642828") {
            var target = receivedMessage.mentions.members.first();
            con.query("SELECT * FROM userdata WHERE usrid = '" + target.id + "'", function (err, result, fields) {
                if (err) throw err;
                var not = ""
                con.query("UPDATE `cerbotdb`.`userdata` SET `realname`='" + not + "' WHERE  `id`=" + result[0].id + ";")
                con.query("UPDATE `cerbotdb`.`userdata` SET `nickname`='" + not + "' WHERE  `id`=" + result[0].id + ";")
                con.query("UPDATE `cerbotdb`.`userdata` SET `birthday`='" + not + "' WHERE  `id`=" + result[0].id + ";")
                con.query("UPDATE `cerbotdb`.`userdata` SET `favcol`='" + not + "' WHERE  `id`=" + result[0].id + ";")
                con.query("UPDATE `cerbotdb`.`userdata` SET `gender`='" + not + "' WHERE  `id`=" + result[0].id + ";")
                con.query("UPDATE `cerbotdb`.`userdata` SET `size`='" + not + "' WHERE  `id`=" + result[0].id + ";")
                con.query("UPDATE `cerbotdb`.`userdata` SET `hobbys`='" + not + "' WHERE  `id`=" + result[0].id + ";")
                con.query("UPDATE `cerbotdb`.`userdata` SET `selfdesc`='" + not + "' WHERE  `id`=" + result[0].id + ";")
            });
            receivedMessage.channel.send("Der Steckbrief von " + target + " wurde zurückgesetzt.")
            const lt = require('./../bot.js');
            lt.logging("0x0000FF", "Steckbriefsystem", "Ein Logeintrag zum Steckbriefsystem", "Steckbrief wurde zurückgesetzt",
                "" + receivedMessage.author + " (ID: ``" + receivedMessage.author.id + "``) hat den Steckbrief von " + target + " (ID: ``" + target.id + "``) zurückgesetzt.");
        }
    },
};