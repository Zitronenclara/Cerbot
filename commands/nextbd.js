const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');

module.exports = {
    name: 'nextbd',
    description: 'Zeigt dir die nächsten 20 Geburstage an',
    category: 'Sonstiges',
    usage: '``c!nextbd``',
    execute(arguments, receivedMessage) {
        con.query("SELECT id, usrid, birthdate FROM userdata WHERE birthdate IS NOT NULL;", function (err, result, fields) {
            if (err) throw err;
            var a = new Date(receivedMessage.createdTimestamp + 32400000)
            bds = [];
            for(i=0; i < result.length; i++){
                bd = result[i].birthdate
                year = a.getFullYear()
                month = bd.getMonth() + 1
                day = bd.getDate()
                if (month < 10){
                    month = "0"+month
                }
                if (day < 10){
                    day = "0"+day
                }
                bdate = new Date("" + year + "-" + month + "-" + day)
                timeleft = bdate - a + 86400000
                if (timeleft < -86400000){
                    timeleft = timeleft + 31536000000
                    year = year + 1
                }
                tage = Math.round(timeleft / 86400000)
                alter = year - bd.getFullYear()
                bds[i] = [result[i].usrid, "``"+day+"."+month+"."+year+"``", timeleft, tage, alter]
            }
            bds.sort(function(a, b){return a[2]-b[2]})
            const nextbdembed = new Discord.RichEmbed()
                .setTitle("**Die nächsten Geburtstage...**")
                .setColor("0xFFFFFF");
            var loop;
            if (bds.length < 20){
                loop = bds.length
            }else{
                loop = 20
            }
            for(j=0; j < loop; j++){
                if(bds[j][3] == 0){
                    nextbdembed.addField("**HEUTE OWO**", "💞🎂"+bds[j][1]+" ➜ <@"+bds[j][0]+"> ist jetzt **"+bds[j][4]+"**🎂💞")
                }else if (bds[j][3] == 1){
                    nextbdembed.addField("**MORGEN**", bds[j][1]+" ➜ <@"+bds[j][0]+"> wird **"+bds[j][4]+"**")
                }else if (bds[j][3] == 2){
                    nextbdembed.addField("**ÜBERMORGEN**", bds[j][1]+" ➜ <@"+bds[j][0]+"> wird **"+bds[j][4]+"**")
                }else{
                    nextbdembed.addField("**in "+bds[j][3]+" Tagen**", bds[j][1]+" ➜ <@"+bds[j][0]+"> wird **"+bds[j][4]+"**")
                }
            }
            receivedMessage.channel.send(nextbdembed)
        });
    },
};