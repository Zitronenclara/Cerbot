const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');
const randomizer = require('./../planetrandomizer.js')

module.exports = {
    name: 'starthts',
    description: 'Startet das Hell to Space Gameplay für 1500 Seelen',
    category: 'Space',
    usage: '``c!starthts``',
    execute(arguments, receivedMessage) {
        if (receivedMessage.member.roles.find(r => r.name === "Commander")) {
            receivedMessage.reply("du hast bereits ein Raumschiff du Keks xD")
            return
        }
        receivedMessage.reply("sicher, dass du **1500**❦ Seelen bezahlen möchtest, damit du die weiten des Universums erkunden kannst?")
            .then(message => {
                message.react('✅').then(() => message.react('❌'));
                const filter = (reaction, user) => {
                    return ['✅', '❌'].includes(reaction.emoji.name) && user.id === receivedMessage.author.id;
                };
                message.awaitReactions(filter, {
                        max: 1,
                        time: 30000,
                        errors: ['time'],
                    })
                    .then((collected) => {
                        if (collected.first().emoji.name === '✅') {
                            var usinfo;
                            var nomonni = 0;
                            con.query("SELECT * FROM userdata WHERE usrid = '" + receivedMessage.author.id + "'", function (err, result, fields) {
                                if (err) throw err;
                                usinfo = result[0]
                                if (usinfo.coins >= 1500) {
                                    var newcoinsspent = usinfo.coinsspent + 1500
                                    var newcoins = usinfo.coins - 1500
                                    con.query("UPDATE `cerbotdb`.`userdata` SET `coins`=" + newcoins + " WHERE  `id`=" + usinfo.id + ";")
                                    con.query("UPDATE `cerbotdb`.`userdata` SET `coinsspent`=" + newcoinsspent + " WHERE  `id`=" + usinfo.id + ";")
                                } else {
                                    nomonni = 1
                                }
                            });

                            //Wartet erst auf DB
                            setTimeout(() => {
                                if (nomonni == 0) {
                                    receivedMessage.reply("dein Schiff wurde dir zugestellt c: Gib ``c!tutorial`` ein, um wichtige Infos über **Hell to Space** zu erhalten, ohne die du beim Spielen nicht weit kommst.")
                                    randomizer.htsinit(receivedMessage.author, receivedMessage.member)
                                    const lt = require('./../bot.js');
                                    lt.logging("0x000000", "Hell to Space", "Ein Logeintrag zu Hell to Space", "Inventar wurde erstellt",
                                        "" + receivedMessage.author + " (ID: ``" + receivedMessage.author.id + "``) ist jetzt Commander seines/ihres neuen Schiffs.");
                                }
                            }, 300);
                        } else if (collected.first().emoji.name === '❌') {
                            message.channel.send("Du hast den Kauf abgebrochen :c");
                        }
                    })
                    .catch(() => {
                        message.channel.send(`Keine Reaktion, lass dir halt einfach noch ein bisschen Zeit uwu.`);
                    })
            })
    },
};