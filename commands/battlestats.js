const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');

module.exports = {
    name: 'battlestats',
    description: 'Zeigt dir deine Kampfstatistiken oder die Kampfstatistiken eines ausgewählten Users',
    category: 'Kampfsystem',
    usage: '``c!battlestats``, ``c!battlestats @user``',
    execute(arguments, receivedMessage) {
        if (!receivedMessage.mentions.users.size) {
            var target = receivedMessage.member
        } else {
            var target = receivedMessage.mentions.members.first();
        }
        con.query("SELECT * FROM userdata WHERE usrid = '" + target.id + "'", function (err, result, fields) {
            if (err) throw err;
            var udat = result
            if (udat = undefined || udat.length == 0) {
                var initid = "" + target.id + ""
                receivedMessage.channel.send("Probiere es erneut.")
                const unt = require('./../bot.js');
                unt.dbinitus(target.id);
            } else {
                con.query("SELECT * FROM userdata WHERE usrid = '" + target.id + "'", function (err, result, fields) {
                    if (err) throw err;
                    const profmes = new Discord.RichEmbed()
                        .setTitle("**Kampfprofil**")
                        .setColor("0xFF4500")
                        .setDescription("Hier siehst du das Kampfprofil von " + target)
                        .setThumbnail(target.user.avatarURL)
                        .addField("Maximale HP", "**" + result[0].maxhp + "** HP")
                        .addField("Maximale Angriffskraft", "**" + (result[0].power + 5) + "** ATK")
                        .addField("Verteidigungspunkte", "**" + result[0].defense + "** DEF")
                        .addField("Siege", "**" + result[0].wins + "**")
                        .addField("Niederlagen", "**" + result[0].loses + "**")
                        .setTimestamp()
                    receivedMessage.channel.send(profmes)
                });
            }
        });
        console.log("battlestats command executed")
    },
};