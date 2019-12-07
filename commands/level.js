global.fs = require('fs');
global.discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');
var Jimp = require('jimp');

module.exports = {
    name: 'level',
    description: 'Zeigt dir dein oder das Level eines beliebigen Users',
    category: 'Stats',
    usage: '``c!level``, ``c!level @user``',
    execute(arguments, receivedMessage) {
        if (!receivedMessage.mentions.users.size) {
            var target = receivedMessage.member
        } else {
            var target = receivedMessage.mentions.members.first();
        }
        if (target.bot) {
            receivedMessage.channel.send(receivedMessage.author + ", Bots haben keine Level.")
            return
        }
        con.query("SELECT * FROM userdata WHERE usrid = '" + target.id + "'", function (err, result, fields) {
            if (err) throw err;
            var udat = result
            if (udat = undefined || udat.length == 0) {
                var initid = "" + target.id + ""
                var sql = "INSERT INTO userdata (usrid, coins, coinsget, coinsspent, coinstrans, coinstransget, xdcount, uwucount, owocount, advget, earnedc) VALUES (" + initid + ", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)";
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log("User " + initid + " added to the Database");
                });
            }
        });
        con.query("SELECT id, xp, level FROM userdata WHERE usrid = '" + target.id + "'", function (err, result, fields) {
            var targetav = target.user.displayAvatarURL
            var targetxp = result[0].xp
            var targetlev = result[0].level
            var forlev = targetlev + 1
            var maxxp = 5 * (forlev * forlev) + 50 * forlev + 100
            var prozent = Math.round(targetxp / maxxp * 100)
            var anteil = Math.round(1020 * (prozent / 100))
            var rest = maxxp - targetxp
            var mes = Math.round(rest / 12)
            if (mes >= 60){
                mes = Math.round(mes / 60)
                if (mes >= 24){
                    mes = Math.round(mes / 24)
                    var timeleft = mes+"d"
                }else{
                   var timeleft = mes+"h"
                }
            }else{
               var timeleft = mes+"min"
            }
            con.query("SELECT id, usrid, level, xp FROM userdata", function (err, result, fields) {
                rank = [];
                z = result.length;
                var xpp;
                for (i = 0; i < result.length; i++) {
                    xpp = result[i].xp
                    if (result[i].level > 0){
                        x = result[i].level + 1
                        for (j = 1; j < x; j++){
                            xpp = xpp + (5 * (j * j) + 50 * j + 100)
                        }
                    }
                    rank[i] = [result[i].usrid, result[i].level, (xpp - 100)]
                    xpp = 0
                }
                rank.sort(function (a, b) {
                    return b[2] - a[2]
                })
                ranks = [];
                y = rank.length;
                for (i = 0; i < result.length; i++) {
                    ranks[i] = [rank[i][0], rank[i][1], rank[i][2], i + 1]
                }
                var platz = ranks.filter(item => item[0] == target.id)[0][3];
                Jimp.read("./level-back.jpg").then(async background => {
                    Jimp.loadFont('.font.fnt').then(async font => {
                        var hex = target.displayHexColor
                        var hexa = Jimp.cssColorToHex(hex);
                        var balken = new Jimp(anteil, 70, hexa);
                        var targav = await Jimp.read(targetav);
                        var fontleng = Jimp.measureText(font, target.displayName);
                        var fontlengb = Jimp.measureText(font, "" + targetxp + "/" + maxxp + "xp");
                        var fontlengc = Jimp.measureText(font, "Level: " + targetlev);
                        var fontlengd = Jimp.measureText(font, "Platz #" + platz + " von "+rank.length);
                        var fontlenge = Jimp.measureText(font, "lvlup in: "+timeleft);
                        var placetext = (1120 - fontleng) / 2
                        var placetextb = (1120 - fontlengb) / 2
                        var placetextc = (600 - fontlengc) / 2 + 460
                        var placetextd = (600 - fontlengd) / 2 + 460
                        var placetexte = (600 - fontlenge) / 2 + 460
                        targav.resize(350, 350);
                        background.resize(1120, 640)
                            .blit(targav, 50, 130)
                            .blit(balken, 50, 520)
                            .print(font, placetext, 20, target.displayName)
                            .print(font, placetextb, 520, "" + targetxp + "/" + maxxp + "xp")
                            .print(font, placetextc, 130, "Level: " + targetlev)
                            .print(font, placetextd, 270, "Platz #" + platz + " von "+rank.length)
                            .print(font, placetexte, 410, "lvlup in: "+timeleft)
                            .getBufferAsync(Jimp.MIME_PNG).then(buffer => {
                                const pic = new discord.Attachment(buffer, "lvlpic.png")
                                receivedMessage.channel.send(pic)
                            });
                    });
                });
            });
        });
    },
};