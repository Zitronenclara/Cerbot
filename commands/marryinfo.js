const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');

module.exports = {
    name: 'marryinfo',
    description: 'Zeigt dir deine oder die Hochzeitsinfos eines beliebigen Users',
    category: 'Sonstiges',
    usage: '``c!marryinfo``, ``c!marryinfo @user``',
    execute(arguments, receivedMessage) {
        if (!receivedMessage.mentions.users.size) {
            var target = receivedMessage.member
        } else {
            var target = receivedMessage.mentions.members.first();
        }
        if (target.user.bot){
            receivedMessage.reply("Bots können nicht heiraten uwu")
            return
        }
        target = target.user
        con.query("SELECT * FROM userdata WHERE usrid = '" + target.id + "'", function (err, result, fields) {
            if (err) throw err;
            var udat = result
            if (udat = undefined || udat.length == 0) {
                var initid = "" + target.id + ""
                const unt = require('./../bot.js');
                unt.dbinitus(target.id);
            }
        });
        con.query("SELECT id, married, marrystamp FROM userdata WHERE usrid = '" + target.id + "'", function (err, result, fields) {
            if (err) throw err;
            if (result[0].married == null || result[0].married == "single"){
                receivedMessage.reply("diese Person ist nicht verheiratet uwu")
                return
            }
            var partner = result[0].married
            var sekunden = ((receivedMessage.createdTimestamp - result[0].marrystamp) / 1000).toFixed(2)
            var minuten = (sekunden / 60).toFixed(2)
            var stunden = (minuten / 60).toFixed(2)
            var tagen = (stunden / 24).toFixed(2)
            var merkurtage = (stunden / 1465.6).toFixed(4)
            var venustage = (stunden / 5832.45).toFixed(4)
            var marstage = (stunden / 24.65979).toFixed(2)
            var jupitertage = (stunden / 9.9166).toFixed(2)
            var saturntage = (stunden / 10.7833).toFixed(2)
            var uranustage = (stunden / 17.2333).toFixed(2)
            var neptuntage = (stunden / 15.9666).toFixed(2)
            var tote = Math.round(sekunden * 1.7361)
            var geboren = Math.round(sekunden * 4.2361)
            var instapics = Math.round(minuten * 46500)
            var tweets = Math.round(minuten * 98000)
            var googl = Math.round(minuten * 3500000)
            var youtb = Math.round(minuten * 4000000)
            var a = new Date(result[0].marrystamp + 32400000)
            var month = a.getMonth();
            var date = a.getDate();
            var hours = a.getHours();
            if (hours < 10) {
                hours = "0" + hours
            }
            var minutes = a.getMinutes();
            if (minutes < 10) {
                minutes = "0" + minutes
            }
            var seconds = a.getSeconds();
            if (seconds < 10) {
                seconds = "0" + seconds
            }
            const infoembed = new Discord.RichEmbed()
                .setTitle("**Hochzeitsinfos**")
                .setColor("0xFF69B4")
                .setDescription("Hier siehst du die Hochzeitsinfos von " + target)
                .setThumbnail(target.avatarURL)
                .addField("**Ehepartner**", "💕 <@" + partner + "> 💕")
                .addField("**geheiratet am**", "💖 ``" + date + "." + (month + 1) + ". um " + (hours) + ":" + minutes + ":" + seconds + " Uhr`` 💖")
                .addField("**Zeit verheiratet**", "**in Sekunden:** ``"+sekunden+"``\n**in Minuten:** ``"+minuten+"``\n**in Stunden:** ``"+stunden+"``\n**in Tagen:** ``"+tagen+"``\n**in Marstagen:** ``"+marstage+"``\n**in Merkurtagen:** ``"+merkurtage+"``\n**in Venustagen:** ``"+venustage+"``\n**in Jupitertagen:** ``"+jupitertage+"``\n**in Saturntagen:** ``"+saturntage+"``\n**in Uranustagen:** ``"+uranustage+"``\n**in Neptuntagen:** ``"+neptuntage+"``\n")
                .addField("**Während ihr verheiratet seid...**", "sind ``"+tote+"`` Menschen gestorben\nwurden ``"+geboren+"`` Babys geboren\nwurden ``"+instapics+"`` Bilder auf Instagram gepostet\nwurde ``"+tweets+"`` mal getwittert\nwurde ``"+googl+"`` mal gegooglet\nwurden ``"+youtb+"`` Videos auf Youtube angeklickt")
                .setTimestamp()
            receivedMessage.channel.send(infoembed)
        });
    },
};