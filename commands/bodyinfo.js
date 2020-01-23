const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');

module.exports = {
    name: 'bodyinfo',
    description: 'Zeigt dir Infos über den Körper mit der Id ``[id]``',
    category: 'Space',
    usage: '``c!bodyinfo [id]``',
    execute(arguments, receivedMessage) {
        if (!receivedMessage.member.roles.find(r => r.name === "Commander")) {
            receivedMessage.reply("du hast noch kein Raumschiff, kaufe dir eins mit ``c!starthts`` c:")
            return
        }
        var targetid = parseFloat(arguments.find(arg => !/<@!?\d+>/g.test(arg)), 0);
        if (!targetid || isNaN(targetid)) {
            receivedMessage.reply("bitte gib eine gültige ID an. Die ID des Körpers findet man bei seiner Sprunginformation ganz unten in klein. c:")
            return
        }
        var bodyinfo;
        var bodyda = 1;
        var ustarget;
        var desc;
        con.query("SELECT * FROM spacebodies WHERE id = " + targetid + "", function (err, result, fields) {
            if (err) throw err;
            var udat = result
            if (udat = undefined || udat.length == 0) {
                bodyda = 0
                receivedMessage.reply("es wurde kein Körper mit der ID ``" + targetid + "`` gefunden. Bitte überprüfe deine Eingabe nochmal uwu")
                return
            } else {
                bodyinfo = result[0]
                if ("" + receivedMessage.author.id + "" == bodyinfo.ownerid) {
                    ustarget = bodyinfo.ownerid
                    desc = "*Du siehst nur die Informationen, bei denen du eine Scaneffizienz von 100% oder die benötigte KI hast*"
                } else {
                    ustarget = bodyinfo.fountid
                    desc = "*Du siehst nur die Informationen, bei denen der Entdecker eine Scaneffizienz von 100% oder die benötigte KI hat*"
                }
            }
        });
        setTimeout(() => {
            if (bodyda == 0) {
                return
            } else {
                con.query("SELECT * FROM htsinv WHERE userid = '" + ustarget + "'", function (err, result, fields) {
                    if (err) throw err;
                    usinfo = result[0]

                    //definiert den Besitz
                    var owner;
                    if (!bodyinfo.ownerid) {
                        owner = "niemandem"
                    } else {
                        owner = "<@" + bodyinfo.ownerid + ">"
                    }

                    //schaut nach Größenbewerter
                    var sizebewertung = "{ohne Größenbewerter aufgezeichnet}"
                    if (usinfo.sizebewert != 0) {
                        sizebewertung = bodyinfo.comp
                    }

                    const bodyembed = new Discord.RichEmbed()
                        .setTitle(bodyinfo.art + " ***" + bodyinfo.name + "***")
                        .setDescription(desc)
                        .setColor("0xFFFFFF")
                        .addField("**Ansprüche**", "entdeckt von <@" + bodyinfo.fountid + "> & beansprucht von " + owner)
                        .addField("**Wert**", "**" + bodyinfo.wert + "⍟**")
                        .addField("**Durchmesser**", "" + bodyinfo.size + "km (*" + sizebewertung + "*)")
                        .setFooter("ID: #" + bodyinfo.id + "");

                    //schaut nach Ressourcenzeugs
                    if (usinfo.ressclvl == 10 || usinfo.resbewert != 0) {
                        var resaname = "Ressourcenname unbekannt";
                        var resbname = resaname;
                        var resaamount = "Quantität unbekannt";
                        var resbamount = resaamount;
                        var resakons = "Konsistenz unbekannt";
                        var resbkons = resakons;
                        var resarar = "{ohne Ressourcenbewerter aufgezeichnet}";
                        var resbrar = resarar;

                        if (usinfo.ressclvl == 10) {
                            resaname = bodyinfo.resaname
                            resbname = bodyinfo.resbname
                            resaamount = Math.round(bodyinfo.resaamount * 100)
                            resbamount = Math.round(bodyinfo.resbamount * 100)
                            resakons = bodyinfo.resakons
                            resbkons = bodyinfo.resbkons
                        }

                        if (usinfo.resbewert != 0) {
                            resarar = bodyinfo.resarar
                            resbrar = bodyinfo.resbrar
                        }

                        bodyembed.addField("**Ressourcen**", "**" + resaname + "** *(" + resaamount + "%)* - ``" + resakons + "`` Seltenheit: **" + resarar + "**\n**" + resbname + "** *(" + resbamount + "%)* - ``" + resbkons + "`` Seltenheit: **" + resbrar + "**")
                    }

                    //schaut nach Gravitationszeugs
                    if (usinfo.gravsclvl == 10) {
                        bodyembed.addField("**Gravitation**", "" + bodyinfo.grav + "G")
                    }

                    //schaut nach Atmosphärenzeugs
                    if (usinfo.atmsclvl == 10 || usinfo.atmbewert != 0) {
                        var atmobewertung = "{ohne Atmosphärenbewerter aufgezeichnet}"
                        var atmorate = "Atmosphärenrate unbekannt"

                        if (usinfo.atmsclvl == 10) {
                            atmorate = Math.round((bodyinfo.atmrate - 1) * 100)
                            if (atmorate < 0) {
                                atmorate = 0
                            }
                        }
                        if (usinfo.atmbewert != 0) {
                            atmobewertung = bodyinfo.atmart
                        }

                        bodyembed.addField("**Atmosphäre**", "``" + atmobewertung + "`` *(" + atmorate + "%)*")
                    }

                    //schaut nach Rotationszeugs
                    if (usinfo.rotsclvl == 10) {
                        var rotdauer = bodyinfo.rottext
                        bodyembed.addField("**Rotationsdauer**", rotdauer)
                    }

                    //schaut nach Wasserzeugs
                    if (usinfo.watersclvl == 10 || usinfo.waterbewert != 0) {
                        var wassergehalt = "Wassergehalt unbekannt"
                        var wasserbewertung = "{ohne Wasserbewerter aufgezeichnet}"

                        if (usinfo.watersclvl == 10) {
                            wassergehalt = bodyinfo.water
                        }
                        if (usinfo.waterbewert != 0) {
                            wasserbewertung = bodyinfo.waterart
                        }

                        bodyembed.addField("**Wassergehalt**", "``" + wassergehalt + "%`` *(" + wasserbewertung + ")*")
                    }

                    //schaut nach Temperaturzeugs
                    if (usinfo.tempsclvl == 10 || usinfo.tempbewert != 0) {
                        var temperatur = "Temperatur unbekannt"
                        var temperaturbewertung = "{ohne Temperaturbewerter aufgezeichnet}"

                        if (usinfo.tempsclvl == 10) {
                            temperatur = bodyinfo.temp
                        }
                        if (usinfo.tempbewert != 0) {
                            temperaturbewertung = bodyinfo.tempart
                        }

                        bodyembed.addField("**Oberflächentemperatur**", "" + temperatur + "°C *(" + temperaturbewertung + ")*")
                    }

                    //schaut nach Magnetzeugs
                    if (usinfo.magnetsclvl == 10 || usinfo.magnetbewert != 0) {
                        var magnetfeld = "Stärke unbekannt"
                        var magnetfeldbewertung = "{ohne Magnetfeldbewerter aufgezeichnet}"

                        if (usinfo.magnetsclvl == 10) {
                            magnetfeld = bodyinfo.magnet
                        }
                        if (usinfo.magnetbewert != 0) {
                            magnetfeldbewertung = bodyinfo.magnetart
                        }

                        bodyembed.addField("**Magnetfeld**", "effektive Stärke: **" + magnetfeld + "** *(" + magnetfeldbewertung + ")*")
                    }

                    //schaut nach ESI
                    if (usinfo.esirechner != 0) {
                        var esi = bodyinfo.esi
                        bodyembed.addField("**Erdähnlichkeit**", "**" + esi + "%**")
                    }

                    //schaut nach Bewohnbarkeit
                    if (usinfo.habitbewert != 0) {
                        var habitability = bodyinfo.habitability
                        bodyembed.addField("**Bewohnbarkeit**", habitability)
                    }

                    //schaut nach Anomalien
                    if (usinfo.anomalysclvl == 10) {
                        var anomalie = bodyinfo.anomaly
                        var anomaliewert = bodyinfo.anowert
                        bodyembed.addField("**Anomalien**", "**[** ***" + anomalie + "*** **]** ``" + anomaliewert + "FP``")
                    }

                    receivedMessage.channel.send(bodyembed)
                });
            }
        }, 300);
    },
};