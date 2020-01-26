const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');

module.exports = {
    name: 'collect',
    description: 'Sammelt die abgebauten Ressourcen ein',
    category: 'Space',
    usage: '``c!collect``',
    execute(arguments, receivedMessage) {
        var valid = 1;
        if (!receivedMessage.member.roles.find(r => r.name === "Commander")) {
            receivedMessage.reply("du hast noch kein Raumschiff, kaufe dir eins mit ``c!starthts`` c:")
            valid = 0
            return
        }

        var usinfo;
        var bodyinfo;
        con.query("SELECT * FROM htsinv WHERE userid = '" + receivedMessage.author.id + "'", function (err, result, fields) {
            if (err) throw err;
            usinfo = result[0]
        });

        setTimeout(() => {
            if (!usinfo.orbitid || usinfo.orbitid == 0 || usinfo.orbitid == null) {
                receivedMessage.reply("du befindest dich nicht mal in einem gültigen Orbit um einen Körper. Mit ``c!jump`` kannst du zu einem Körper springen.")
                valid = 0
                return
            }
            if (!usinfo.miningstring || usinfo.miningstring == "0" || usinfo.miningstring == null || usinfo.miningstring == "") {
                receivedMessage.reply("du baust aktuell keine Ressourcen ab. Mit ``c!miningdrone`` kannst du eine Abbaudrohne starten.")
                valid = 0
                return
            }
            if (receivedMessage.createdTimestamp < usinfo.miningstamp) {
                var minutesleft = Math.round((usinfo.miningstamp - receivedMessage.createdTimestamp) / 60000)
                receivedMessage.reply("du musst noch **" + minutesleft + " Minuten** warten, bevor du deine Ressourcen abholen kannst.")
                valid = 0
                return
            }
            con.query("SELECT * FROM spacebodies WHERE id = " + usinfo.orbitid + "", function (err, result, fields) {
                if (err) throw err;
                bodyinfo = result[0]
            });
            setTimeout(() => {
                if (valid == 1) {
                    var mesu = "";
                    var mets = usinfo.miningstring.match(/.{1,4}/g);
                    var methaget = parseInt(mets[10])
                    var ethaget = parseInt(mets[9])
                    var propaget = parseInt(mets[8])
                    var butaget = parseInt(mets[7])
                    var pentaget = parseInt(mets[6])
                    var hexaget = parseInt(mets[5])
                    var heptaget = parseInt(mets[4])
                    var octaget = parseInt(mets[3])
                    var nonaget = parseInt(mets[2])
                    var decaget = parseInt(mets[1])
                    var ultraget = parseInt(mets[0])
                    var resweg = usinfo.minewegstring.match(/.{1,3}/g);
                    var resaweg = (parseFloat(resweg[0])) / 100
                    var resbweg = (parseFloat(resweg[1])) / 100

                    //entfernt Ressourcen vom Zielkörper
                    con.query("UPDATE `cerbotdb`.`spacebodies` SET `resaamount`= " + (bodyinfo.resaamount - resaweg) + " WHERE  `id`=" + bodyinfo.id + ";")
                    con.query("UPDATE `cerbotdb`.`spacebodies` SET `resbamount`= " + (bodyinfo.resbamount - resbweg) + " WHERE  `id`=" + bodyinfo.id + ";")
                    con.query("UPDATE `cerbotdb`.`spacebodies` SET `mined`= 0 WHERE  `id`=" + bodyinfo.id + ";")

                    //setzt Zeugs vom Spieler wieder auf 0, damit er wieder abbauen kann
                    con.query("UPDATE `cerbotdb`.`htsinv` SET `miningstring`= '0' WHERE  `userid`='" + receivedMessage.author.id + "';")
                    con.query("UPDATE `cerbotdb`.`htsinv` SET `minewegstring`= '0' WHERE  `userid`='" + receivedMessage.author.id + "';")
                    con.query("UPDATE `cerbotdb`.`htsinv` SET `miningstamp`= 0 WHERE  `userid`='" + receivedMessage.author.id + "';")

                    //gibt dem Spieler die abgebauten Materialien
                    if (methaget > 0) {
                        con.query("UPDATE `cerbotdb`.`htsinv` SET `metha`= " + (usinfo.metha + methaget) + " WHERE  `userid`='" + receivedMessage.author.id + "';")
                        mesu += "+**" + methaget + "** ``Methazonium`` erhalten!\n"
                    }
                    if (ethaget > 0) {
                        con.query("UPDATE `cerbotdb`.`htsinv` SET `etha`= " + (usinfo.etha + ethaget) + " WHERE  `userid`='" + receivedMessage.author.id + "';")
                        mesu += "+**" + ethaget + "** ``Ethazonium`` erhalten!\n"
                    }
                    if (propaget > 0) {
                        con.query("UPDATE `cerbotdb`.`htsinv` SET `propa`= " + (usinfo.propa + propaget) + " WHERE  `userid`='" + receivedMessage.author.id + "';")
                        mesu += "+**" + propaget + "** ``Propazonium`` erhalten!\n"
                    }
                    if (butaget > 0) {
                        con.query("UPDATE `cerbotdb`.`htsinv` SET `buta`= " + (usinfo.buta + butaget) + " WHERE  `userid`='" + receivedMessage.author.id + "';")
                        mesu += "+**" + butaget + "** ``Butazonium`` erhalten!\n"
                    }
                    if (pentaget > 0) {
                        con.query("UPDATE `cerbotdb`.`htsinv` SET `penta`= " + (usinfo.penta + pentaget) + " WHERE  `userid`='" + receivedMessage.author.id + "';")
                        mesu += "+**" + pentaget + "** ``Pentazonium`` erhalten!\n"
                    }
                    if (hexaget > 0) {
                        con.query("UPDATE `cerbotdb`.`htsinv` SET `hexa`= " + (usinfo.hexa + hexaget) + " WHERE  `userid`='" + receivedMessage.author.id + "';")
                        mesu += "+**" + hexaget + "** ``Hexazonium`` erhalten!\n"
                    }
                    if (heptaget > 0) {
                        con.query("UPDATE `cerbotdb`.`htsinv` SET `hepta`= " + (usinfo.hepta + heptaget) + " WHERE  `userid`='" + receivedMessage.author.id + "';")
                        mesu += "+**" + heptaget + "** ``Heptazonium`` erhalten!\n"
                    }
                    if (octaget > 0) {
                        con.query("UPDATE `cerbotdb`.`htsinv` SET `octa`= " + (usinfo.octa + octaget) + " WHERE  `userid`='" + receivedMessage.author.id + "';")
                        mesu += "+**" + octaget + "** ``Octazonium`` erhalten!\n"
                    }
                    if (nonaget > 0) {
                        con.query("UPDATE `cerbotdb`.`htsinv` SET `nona`= " + (usinfo.nona + nonaget) + " WHERE  `userid`='" + receivedMessage.author.id + "';")
                        mesu += "+**" + nonaget + "** ``Nonazonium`` erhalten!\n"
                    }
                    if (decaget > 0) {
                        con.query("UPDATE `cerbotdb`.`htsinv` SET `deca`= " + (usinfo.deca + decaget) + " WHERE  `userid`='" + receivedMessage.author.id + "';")
                        mesu += "+**" + decaget + "** ``Decazonium`` erhalten!\n"
                    }
                    if (ultraget > 0) {
                        con.query("UPDATE `cerbotdb`.`htsinv` SET `ultra`= " + (usinfo.ultra + ultraget) + " WHERE  `userid`='" + receivedMessage.author.id + "';")
                        mesu += "+**" + ultraget + "** ``Ultrazonium`` erhalten!\n"
                    }

                    //sendet zum Abschluss die Nachricht
                    receivedMessage.channel.send(mesu)
                }
            }, 200);
        }, 300);
    },
};