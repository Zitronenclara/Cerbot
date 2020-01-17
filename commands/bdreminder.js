const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');

module.exports = {
    name: 'bdreminder',
    description: 'Damit kannst du deinen Geburtstag eintragen, damit alle anderen dir gratulieren können c:',
    category: 'Sonstiges',
    usage: '``c!bdreminder [tag] [monat] [jahr]``',
    execute(arguments, receivedMessage) {
        if (arguments.length !== 3) {
            receivedMessage.reply("bitte benutze den Befehl wie folgt: ``c!bdreminder [tag] [monat] [jahr]``. Schreibe die [] nicht mit uwu")
            return
        }
        if (arguments[2] > 2017) {
            receivedMessage.reply("lüg nicht xD")
            return
        }
        var bdate = new Date("" + arguments[2] + "-" + arguments[1] + "-" + arguments[0] + " 01:00")
        console.log(bdate)
        if (isNaN(bdate)) {
            receivedMessage.reply("das eingegebene Datum ist nicht gültig.\nBitte benutze den Befehl wie folgt: ``c!bdreminder [tag] [monat] [jahr]``. Schreibe die [] nicht mit uwu")
            return
        }
        var day = bdate.getDate().toString();
        var month = (bdate.getMonth() + 1).toString();
        var year = bdate.getFullYear();
        if (day.length == 1){
            day = "0"+day
        }
        if (month.length == 1){
            month = "0"+month
        }
        var savedate = ""+year+"-"+month+"-"+day+""
        con.query("SELECT id, birthdate FROM userdata WHERE usrid = '" + receivedMessage.author.id + "'", function (err, result, fields) {
            if (err) throw err;
            con.query("UPDATE `cerbotdb`.`userdata` SET `birthdate`='" + savedate + "' WHERE  `id`=" + result[0].id + ";")
        });
        receivedMessage.reply("dein Geburtstag wurde zu ``"+day+"."+month+"."+year+"`` gesetzt.")
    },
};