const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');
const randomizer = require('./../planetrandomizer.js')

module.exports = {
    name: 'orbitinfo',
    description: 'Zeigt dir Infos über den Körper, den du aktuell umkreist',
    category: 'Space',
    usage: '``c!orbitinfo``',
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

        setTimeout(() => {
            if (usinfo.orbitid == null || usinfo.orbitid == 0 || !usinfo.orbitid) {
                receivedMessage.reply("du bist aktuell nicht in einem Orbit um einen Körper. Mit ``c!jump`` springst du zufällig zu einem Körper in diesem Universum uwu")
                return
            } else {
                var bodyinfo;
                con.query("SELECT * FROM spacebodies WHERE id = " + usinfo.orbitid + ";", function (err, result, fields) {
                    if (err) throw err;
                    bodyinfo = result[0]
                });

                setTimeout(() => {
                    var seed = usinfo.orbitinfo.split("");

                    //testet nach Größenbewerter
                    var sizebewertung = "{+Größenbewerter erforderlich}";
                    if (usinfo.sizebewert != 0) {
                        var sizebewertung = bodyinfo.comp
                    }

                    //Testet Orbitseed nach Ressourcenscan
                    var resaname = randomizer.shitstring(20);
                    var resaamount = randomizer.shitstring(5);
                    var resakons = randomizer.shitstring(10);
                    var resbname = randomizer.shitstring(20);
                    var resbamount = randomizer.shitstring(5);
                    var resbkons = randomizer.shitstring(10);

                    if (seed[0] == 1) {
                        resaname = bodyinfo.resaname
                        resaamount = Math.round(bodyinfo.resaamount * 100)
                        resakons = bodyinfo.resakons
                    }

                    if (seed[1] == 1) {
                        resbname = bodyinfo.resbname
                        resbamount = Math.round(bodyinfo.resbamount * 100)
                        resbkons = bodyinfo.resbkons
                    }

                    //testet nach Ressourcenbewerter
                    var resarar = "{+Ressourcenbewerter erforderlich}";
                    var resbrar = "{+Ressourcenbewerter erforderlich}";
                    if (usinfo.resbewert != 0) {
                        resarar = bodyinfo.resarar
                        resbrar = bodyinfo.resbrar
                    }

                    //Testet Orbitseed nach Gravitationsscan
                    var grav = "``" + randomizer.shitstring(10) + "`` ";
                    if (seed[2] == 1) {
                        grav = bodyinfo.grav
                    }

                    //Testet Orbitseed nach Atmosphärenscan
                    var atmorate = randomizer.shitstring(5)
                    if (seed[3] == 1) {
                        atmorate = Math.round((bodyinfo.atmrate - 1) * 100)
                        if (atmorate < 0) {
                            atmorate = 0
                        }
                    }

                    //testet nach Atmosphärenbewerter
                    var atmobewertung = "{+Atmosphärenbewerter erforderlich}"
                    if (usinfo.atmbewert != 0) {
                        atmobewertung = bodyinfo.atmart
                    }

                    //Testet Orbitseed nach Rotationsdauererfassung
                    var rotdauer = "``" + randomizer.shitstring(20) + "``"
                    if (seed[4] == 1) {
                        rotdauer = bodyinfo.rottext
                    }

                    //Testet Orbitseed nach Wasserscan
                    var wassergehalt = randomizer.shitstring(20) + " "
                    if (seed[5] == 1) {
                        wassergehalt = bodyinfo.water
                    }

                    //testet nach Wasserbewerter
                    var wasserbewertung = "{+Wasserbewerter erforderlich}"
                    if (usinfo.waterbewert != 0) {
                        wasserbewertung = bodyinfo.waterart
                    }

                    //Testet Orbitseed nach Temperaturscan
                    var temperatur = "``" + randomizer.shitstring(20) + "`` "
                    if (seed[6] == 1) {
                        temperatur = bodyinfo.temp
                    }

                    //testet nach Temperaturbewerter
                    var temperaturbewertung = "{+Temperaturbewerter erforderlich}"
                    if (usinfo.tempbewert != 0) {
                        temperaturbewertung = bodyinfo.tempart
                    }

                    //Testet Orbitseed nach Magnetfeldscan
                    var magnetfeld = randomizer.shitstring(20)
                    if (seed[7] == 1) {
                        magnetfeld = bodyinfo.magnet
                    }

                    //testet nach Magnetfeldbewerter
                    var magnetfeldbewertung = "{+Magnetfeldbewerter erforderlich}"
                    if (usinfo.magnetbewert != 0) {
                        magnetfeldbewertung = bodyinfo.magnetart
                    }

                    //testet nach Esirechner
                    var esi = "{+ESI-Rechner erforderlich}"
                    if (usinfo.esirechner != 0) {
                        esi = bodyinfo.esi
                    }

                    //testet nach Bewohnbarkeitsbewerter
                    var habitability = "{+Bewohnbarkeitsanalysator erforderlich}"
                    if (usinfo.habitbewert != 0) {
                        habitability = bodyinfo.habitability
                    }

                    //Testet Orbitseed Anomalienscan
                    var anomalie = randomizer.shitstring(20)
                    var anomaliewert = "" + randomizer.shitstring(5) + " "
                    if (seed[8] == 1) {
                        anomalie = bodyinfo.anomaly
                        anomaliewert = bodyinfo.anowert
                    }

                    //definiert den Besitz
                    var owner;
                    if (!bodyinfo.ownerid) {
                        owner = "niemandem"
                    } else {
                        owner = "<@" + bodyinfo.ownerid + ">"
                    }

                    const bodyembed = new Discord.RichEmbed()
                        .setTitle(bodyinfo.art + " ***" + bodyinfo.name + "***")
                        .setDescription("<@" + receivedMessage.author.id + ">*, du bist in einem Orbit um " + bodyinfo.name + ".*")
                        .setThumbnail(receivedMessage.member.displayAvatarURL)
                        .setColor("0xFFFFFF")
                        .addField("**Ansprüche**", "entdeckt von <@" + bodyinfo.fountid + "> & beansprucht von " + owner)
                        .addField("**Durchmesser**", "" + bodyinfo.size + "km (*" + sizebewertung + "*)")
                        .addField("**Ressourcen**", "**" + resaname + "** *(" + resaamount + "%)* - ``" + resakons + "`` Seltenheit: **" + resarar + "**\n**" + resbname + "** *(" + resbamount + "%)* - ``" + resbkons + "`` Seltenheit: **" + resbrar + "**")
                        .addField("**Gravitation**", "" + grav + "G")
                        .addField("**Atmosphäre**", "``" + atmobewertung + "`` *(" + atmorate + "%)*")
                        .addField("**Rotationsdauer**", rotdauer)
                        .addField("**Wassergehalt**", "``" + wassergehalt + "%`` *(" + wasserbewertung + ")*")
                        .addField("**Oberflächentemperatur**", "" + temperatur + "°C *(" + temperaturbewertung + ")*")
                        .addField("**Magnetfeld**", "effektive Stärke: **" + magnetfeld + "** *(" + magnetfeldbewertung + ")*")
                        .addField("**Erdähnlichkeit**", "**" + esi + "%**")
                        .addField("**Wert**", "**" + bodyinfo.wert + "⍟**")
                        .addField("**Bewohnbarkeit**", habitability)
                        .addField("**Anomalien**", "**[** ***" + anomalie + "*** **]** ``" + anomaliewert + "FP``")
                        .setFooter("ID: #" + bodyinfo.id + "")
                    receivedMessage.channel.send(bodyembed)
                }, 200);
            }
        }, 200);
    },
};