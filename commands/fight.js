const fs = require('fs');
global.discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');
var Jimp = require('jimp');
const busy = new Set();

module.exports = {
    name: 'fight',
    description: 'Damit forderst du einen beliebigen User zum Kampf heraus',
    category: 'Kampfsystem',
    usage: '``c!fight @user``',
    execute(arguments, message) {
        //checks if the username to fight is in the message
        let author1 = message.author.username;
        let user = message.mentions.users.first();
        if (!user) return message.reply(" du musst mir schon sagen, gegen wen du Kämpfen willst!");

        //checks if the users is trying to fight themselves
        if (user.id == message.author.id) return message.reply(" du kannst nicht gegen dich selbst kämpfen xD wtf");

        //checks if the user is trying to fight the bot
        if (user.bot == true)
            return message.reply(" niemand kann es mit einem Bot aufnehmen...");
        if (busy.has(message.author.id)) {
            return message.reply(" du bist bereits in einen Kampf/eine Kampfanfrage verwickelt")
        }
        if (busy.has(user.id)) {
            return message.send(user.username + " ist bereits in einen Kampf/eine Kampfanfrage verwickelt")
        }
        //saves the two user ids to variables
        var fighter1 = message.author.id;
        var fighter2 = user.id;
        con.query("SELECT * FROM userdata WHERE usrid = '" + fighter1 + "'", function (err, result, fields) {
            if (err) throw err;
            var udat = result
            if (udat = undefined || udat.length == 0) {
                var sql = "INSERT INTO userdata (usrid, coins, coinsget, coinsspent, coinstrans, coinstransget, xdcount, uwucount, owocount, advget, earnedc) VALUES (" + fighter1 + ", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)";
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log("User " + fighter1 + " added to the Database");
                });
            }
        });
        con.query("SELECT * FROM userdata WHERE usrid = '" + fighter2 + "'", function (err, result, fields) {
            if (err) throw err;
            var udat = result
            if (udat = undefined || udat.length == 0) {
                var sql = "INSERT INTO userdata (usrid, coins, coinsget, coinsspent, coinstrans, coinstransget, xdcount, uwucount, owocount, advget, earnedc) VALUES (" + fighter2 + ", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)";
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log("User " + fighter2 + " added to the Database");
                });
            }
        });
        //announces challenge and awaits response
        var challenged = user.toString();
        message.react('✅').then(() => message.react('❌'));
        busy.add(fighter1);
        busy.add(fighter2);
        const filter = (reaction, user) => {
            return ['✅', '❌'].includes(reaction.emoji.name) && user.id === fighter2;
        };
        message.channel.send(user.username + ", " + author1 + " hat dich zu einem Kampf herausgefordert! Nimmst du die Herausforderung an? Dann reagiere auf die Nachricht!")
            .then(() => {
                message.awaitReactions(filter, {
                        max: 1,
                        time: 60000,
                        errors: ['time'],
                    })
                    .then((collected) => {
                        if (collected.first().emoji.name === '✅') {
                            message.channel.send(`${challenged} hat die Herausforderung angenommen! ${message.author} mach dich bereit! FIGHT!`);
                            con.query("SELECT id, maxhp, power, defense, wins, loses FROM userdata WHERE usrid = '" + message.author.id + "' or usrid = '" + user.id + "'", function (err, result, fields) {
                                if (err) throw err;
                                var autav = message.author.displayAvatarURL;
                                var autnam = message.author.username;
                                var autmaxhp = result[0].maxhp;
                                var autatk = result[0].power;
                                var autdef = result[0].defense;
                                var autid = result[0].id;
                                var authp = autmaxhp;
                                var chalav = user.displayAvatarURL;
                                var chalnam = user.username;
                                var chalmaxhp = result[1].maxhp;
                                var chalatk = result[1].power;
                                var chaldef = result[1].defense;
                                var chalid = result[1].id;
                                var chalhp = chalmaxhp;
                                Jimp.read("./fight-back.jpg").then(async background => {
                                    var autp = await Jimp.read(autav);
                                    var chalp = await Jimp.read(chalav);
                                    // Jetzt sind alle Bilder als Jimp Format zum weiter verarbeiten.
                                    autp.resize(250, 250);
                                    chalp.resize(250, 250);
                                    background.blit(autp, 25, 120).blit(chalp, 577, 120)
                                        .getBufferAsync(Jimp.MIME_PNG).then(buffer => {
                                            const pic = new discord.Attachment(buffer, "vspic.png")
                                            const fightembed = new discord.RichEmbed()
                                                .setTitle("**KAMPFARENA**")
                                                .setColor("0xFF0000")
                                                .attachFile(pic)
                                                .setImage("attachment://vspic.png")
                                                .addField("**" + autnam + "**", "**" + authp + "**/**" + autmaxhp + "** HP\nAtk: **" + (autatk + 5) + "**\nDef: **" + autdef + "**", true)
                                                .addField("**" + chalnam + "**", "**" + chalhp + "**/**" + chalmaxhp + "** HP\nAtk: **" + (chalatk + 5) + "**\nDef: **" + chaldef + "**", true)
                                            message.channel.send(fightembed).then(async fightembed_msg => {
                                                var fighting = true; // Invertierte Logik für While
                                                while (fighting) {
                                                    const fightembed_update = new discord.RichEmbed()
                                                        .setTitle("**KAMPFARENA**")
                                                        .setColor("0xFF0000")
                                                        .attachFile(pic)
                                                        .setImage("attachment://vspic.png");
                                                    // attacke etc
                                                    var autran = Math.floor(Math.random() * (autatk + 5)) + 1;
                                                    var chalran = Math.floor(Math.random() * (chalatk + 5)) + 1;
                                                    var autatt = autran - chaldef
                                                    var chalatt = chalran - autdef
                                                    if (autatt < 0) {
                                                        autatt = 0
                                                    }
                                                    if (chalatt < 0) {
                                                        chalatt = 0
                                                    }
                                                    authp = authp - chalatt
                                                    chalhp = chalhp - autatt
                                                    //prüfen ob jemand tot ist wenn ja fighting auf false setzten
                                                    var win;
                                                    if (authp <= 0 || chalhp <= 0) {

                                                        if (authp <= 0 && chalhp <= 0) {
                                                            //Beide Tot
                                                            win = 0
                                                            authp = 0
                                                            chalhp = 0
                                                        } else if (authp <= 0) {
                                                            //Angreifer Tot
                                                            win = 1
                                                            authp = 0
                                                        } else if (chalhp <= 0) {
                                                            //Defendert Tot
                                                            win = 2
                                                            chalhp = 0
                                                        }
                                                        fighting = false
                                                    }

                                                    //Vorbereiten der Embed
                                                    fightembed_update.addField("**" + autnam + "**", "**" + authp + "**/**" + autmaxhp + "** HP\nAtk: **" + (autatk + 5) + "**\nDef: **" + autdef + "**\n" + autnam + " hat " + chalnam + " **" + autatt + "** Schaden zugefügt!", true)
                                                        .addField("**" + chalnam + "**", "**" + chalhp + "**/**" + chalmaxhp + "** HP\nAtk: **" + (chalatk + 5) + "**\nDef: **" + chaldef + "**\n" + chalnam + " hat " + autnam + " **" + chalatt + "** Schaden zugefügt!", true)

                                                    //Win ermittelt?
                                                    if (win == 0) {
                                                        fightembed_update.addField("**UNENTSCHIEDEN**", "Ihr seid beide schwach...")
                                                        busy.delete(fighter1);
                                                        busy.delete(fighter2);
                                                    } else if (win == 1) {
                                                        fightembed_update.addField(chalnam + " hat **GEWONNEN**", autnam + " streng dich beim nächsten mal etwas mehr an...")
                                                        con.query("UPDATE `cerbotdb`.`userdata` SET `wins`=" + (result[1].wins + 1) + " WHERE `id`=" + chalid + ";")
                                                        con.query("UPDATE `cerbotdb`.`userdata` SET `loses`=" + (result[0].loses + 1) + " WHERE `id`=" + autid + ";")
                                                        busy.delete(fighter1);
                                                        busy.delete(fighter2);
                                                    } else if (win == 2) {
                                                        fightembed_update.addField(autnam + " hat **GEWONNEN**", chalnam + " streng dich beim nächsten mal etwas mehr an...")
                                                        con.query("UPDATE `cerbotdb`.`userdata` SET `wins`=" + (result[0].wins + 1) + " WHERE `id`=" + autid + ";")
                                                        con.query("UPDATE `cerbotdb`.`userdata` SET `loses`=" + (result[1].loses + 1) + " WHERE `id`=" + chalid + ";")
                                                        busy.delete(fighter1);
                                                        busy.delete(fighter2);
                                                    }
                                                    var wait = 5;
                                                    async function update() {
                                                        return new Promise(res => {
                                                            setTimeout(() => {
                                                                fightembed_msg.edit(fightembed_update).then(() => res(true)).catch(err => console.log(err));
                                                            }, wait * 1000)
                                                        });
                                                    }
                                                    //updaten der embed
                                                    await update();
                                                }
                                            })
                                        })
                                });
                            });
                        } else if (collected.first().emoji.name === '❌') {
                            message.channel.send(`Der Gegner hat die Herausforderung abgelehnt!`);
                            busy.delete(fighter1);
                            busy.delete(fighter2);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        message.channel.send(`Keine Antwort, die Kampfanfrage wurde geschlossen.`);
                        busy.delete(fighter1);
                        busy.delete(fighter2);
                    });
            });
    },
};