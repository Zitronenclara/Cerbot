const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');
const randomizer = require('./../planetrandomizer.js')
const res = require('./../resrates.json')

module.exports = {
    name: 'miningdrone',
    description: 'Programmiert eine Abbaudrohne, die Ressourcen des aktuell umkreisten Körpers abzubauen',
    category: 'Space',
    usage: '``c!miningdrone``',
    execute(arguments, receivedMessage) {
        if (!receivedMessage.member.roles.find(r => r.name === "Commander")) {
            receivedMessage.reply("du hast noch kein Raumschiff, kaufe dir eins mit ``c!starthts`` c:")
            return
        }

        var usinfo;
        con.query("SELECT * FROM htsinv WHERE userid = '" + receivedMessage.author.id + "'", function (err, result, fields) {
            if (err) throw err;
            usinfo = result[0]
        });

        var mineres;
        var valid = 1;
        setTimeout(() => {
            if (!usinfo.orbitid || !usinfo.orbitinfo || usinfo.orbitid == null || usinfo.orbitinfo == null || usinfo.orbitid == "" || usinfo.orbitinfo == "") {
                receivedMessage.reply("du befindest dich nicht in einem gültigen Orbit. Mit ``c!jump`` kannst du zu einem Körper springen c:")
                valid = 0
                return
            }
            if (usinfo.miningstring == null || usinfo.miningstring == "0" || !usinfo.miningstring) {

            } else {
                receivedMessage.reply("du baust aktuell Ressourcen ab und kannst nicht noch eine Abbaudrohne starten.")
                valid = 0
                return
            }
            var seed = usinfo.orbitinfo.split("");
            if (seed[0] == 0 && seed[1] == 0) {
                receivedMessage.reply("du hast die **Ressourcen von deinem aktuellen Körper noch nicht erforscht**. Benutze eine ``Aufklärungsdrohne`` oder ``verbessere deine Scanner``, um Ressourcen zu erkennen c:")
                valid = 0
            }
            if (usinfo.minerdrones < 1) {
                receivedMessage.reply("du hast **nicht genügend Abbaudrohnen**, um mögliche Ressourcen abzubauen.")
                valid = 0
            }
            if (valid == 1) {
                con.query("SELECT * FROM spacebodies WHERE id = " + usinfo.orbitid + "", function (err, result, fields) {
                    if (err) throw err;
                    bodyinfo = result[0]

                    if (bodyinfo.mined != 0){
                        receivedMessage.reply("dieser Körper wird aktuell von jemand anderem abgebaut, komme später wieder.")
                        valid = 0
                        return
                    }

                    var metaid;
                    var metbid;
                    var metapercent;
                    var metbpercent;
                    var type = bodyinfo.type;
                    aabbau = 1;
                    babbau = 1;
                    aentdeckt = 1;
                    bentdeckt = 1;

                    //checkt ob ein Stoff bereits aufgebraucht wurde
                    if (bodyinfo.resaamount == 0){
                        metaid = null;
                        metapercent = 0;
                        aentdeckt = 0;
                        aabbau = 0;
                    }

                    if (bodyinfo.resbamount == 0){
                        metbid = null;
                        metbpercent = 0;
                        bentdeckt = 0;
                        babbau = 0;
                    }

                    //checkt welche Ressourcen entdeckt wurden
                    if (seed[0] == 1) {
                        metaid = bodyinfo.resaid
                        metapercent = bodyinfo.resaamount
                    } else {
                        metaid = null;
                        metapercent = 0;
                        aentdeckt = 0;
                        aabbau = 0;
                    }
                    if (seed[1] == 1) {
                        metbid = bodyinfo.resbid
                        metbpercent = bodyinfo.resbamount
                    } else {
                        metbid = null;
                        metbpercent = 0;
                        bentdeckt = 0;
                        babbau = 0;
                    }

                    //checkt die Wertigkeiten der Stoffe
                    var meta;
                    var metawert;
                    var metb;
                    var metbwert;
                    if (aentdeckt == 1) {
                        meta = res.el[metaid]
                        metawert = meta.azonium
                        if (usinfo.minerlvl < metawert) {
                            aabbau = 0
                            metaid = null;
                            metapercent = 0;
                        }
                    }

                    if (bentdeckt == 1) {
                        metb = res.el[metbid]
                        metbwert = metb.azonium
                        if (usinfo.minerlvl < metbwert) {
                            babbau = 0;
                            metbid = null;
                            metbpercent = 0;
                        }
                    }

                    //prüft alles nochmal durch
                    var mes = "";
                    if (aabbau == 0 && babbau == 0) {
                        valid = 0
                        if (aentdeckt == 1) {
                            mes += "Du kannst **" + meta.name + "** nicht abbauen, dies benötigt Abbausteuerung **Stufe " + metawert + "**.\n"
                        }
                        if (bentdeckt == 1) {
                            mes += "Du kannst **" + metb.name + "** nicht abbauen, dies benötigt Abbausteuerung **Stufe " + metbwert + "**.\n"
                        }

                        if (aentdeckt == 0 && bentdeckt == 0){
                            mes = "Die bekannten Ressourcen auf diesem Körper sind leider erschöpft."
                            valid = 0
                        }
                        receivedMessage.channel.send(mes)
                    }

                    if (aabbau == 0 && aentdeckt == 1 && valid != 0 || babbau == 0 && bentdeckt == 1 && valid != 0) {
                        if (aabbau == 0) {
                            mes += "Du kannst nur **" + metb.name + "** abbauen, da **" + meta.name + "** eine Abbausteuerung von mindestens **Stufe " + metawert + "** benötigt.\n"
                        }
                        if (babbau == 0) {
                            mes += "Du kannst nur **" + meta.name + "** abbauen, da **" + metb.name + "** eine Abbausteuerung von mindestens **Stufe " + metbwert + "** benötigt.\n"
                        }
                        receivedMessage.channel.send(mes)
                    }

                    if (valid != 0) {
                        mineres = randomizer.computeminingstring(type, metaid, metapercent, metbid, metbpercent, usinfo.refraktlvl)
                    }
                });
            }
        }, 300);

        setTimeout(() => {
            if (valid != 0) {
                var metarate = mineres.aanzahl
                var metbrate = mineres.banzahl

                var mesu = receivedMessage.author + ", möchtest du:\n"
                if (metarate != 0) {
                    mesu += "``" + mineres.aton + " Tonnen`` **" + mineres.astoff + "** ➜ max. **" + metarate + "** von **" + mineres.maxaanzahl + "** ``" + mineres.aname + "``\n"
                }
                if (metbrate != 0) {
                    mesu += "``" + mineres.bton + " Tonnen`` **" + mineres.bstoff + "** ➜ max. **" + metbrate + "** von **" + mineres.maxbanzahl + "** ``" + mineres.bname + "``\n"
                }
                mesu += "umwandeln? *(dauert ca. "+(Math.round((bodyinfo.type ** 1.3) * (11 - usinfo.refinelvl)))+" Minuten)*"
                receivedMessage.channel.send(mesu).then(message => {
                    message.react('✅').then(() => message.react('❌'));
                    const filter = (reaction, user) => {
                        return ['✅', '❌'].includes(reaction.emoji.name) && user.id === receivedMessage.author.id;
                    };
                    message.awaitReactions(filter, {
                            max: 1,
                            time: 20000,
                            errors: ['time'],
                        })
                        .then((collected) => {
                            if (collected.first().emoji.name === '✅') {
                                var minutes = Math.round((bodyinfo.type ** 1.3) * (11 - usinfo.refinelvl))
                                var timestampadd = Math.round(minutes * 60000)
                                var newminingstamp = receivedMessage.createdTimestamp + timestampadd
                                con.query("UPDATE `cerbotdb`.`htsinv` SET `miningstring`='" + mineres.miningstring + "' WHERE  `userid`='" + receivedMessage.author.id + "';")
                                con.query("UPDATE `cerbotdb`.`htsinv` SET `minewegstring`='" + mineres.minewegstring + "' WHERE  `userid`='" + receivedMessage.author.id + "';")
                                con.query("UPDATE `cerbotdb`.`htsinv` SET `minerdrones`=" + (usinfo.minerdrones - 1) + " WHERE  `userid`='" + receivedMessage.author.id + "';")
                                con.query("UPDATE `cerbotdb`.`htsinv` SET `miningstamp`=" + newminingstamp + " WHERE  `userid`='" + receivedMessage.author.id + "';")
                                con.query("UPDATE `cerbotdb`.`spacebodies` SET `mined`= 1 WHERE  `id`=" + bodyinfo.id + ";")
                                receivedMessage.channel.send("In **"+minutes+" Minuten** kannst du dir deine Materialien mit ``c!collect`` einsammeln.")
                            } else if (collected.first().emoji.name === '❌') {
                                message.channel.send("Du hast den Abbauvorgang abgebrochen.");
                            }
                        })
                        .catch(() => {
                            message.channel.send(`Keine Reaktion, überlege es dir einfach nochmal c:`);
                        })
                })
            }
        }, 500);
    },
};