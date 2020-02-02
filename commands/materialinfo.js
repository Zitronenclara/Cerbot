const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');
const randomizer = require('./../planetrandomizer.js')
const elements = require('./../resrates.json')
const materials = require('./../matdesc.json')

module.exports = {
    name: 'materialinfo',
    description: 'Gibt dir bestimmte Informationen über ein Material',
    category: 'Space',
    usage: '``c!materielinfo [materialname]``, ``c!materialinfo [materialid]``',
    execute(arguments, receivedMessage) {
        if (arguments.length == 0 || !arguments) {
            receivedMessage.reply("du musst mir schon sagen, über welches Material du Informationen erhalten willst.")
            return
        }

        var material = (arguments[0]).replace(/\b\w/g, l => l.toUpperCase())
        var ergebnis = materials.mats.find(m => m.name === material)

        if (ergebnis == undefined) {
            var ergebnis = materials.mats.find(m => m.id === parseInt(material))
        }
        if (ergebnis == undefined) {
            receivedMessage.reply("ich konnte das Material ``" + material + "`` leider nicht finden uwu Bist du sicher, dass du es richtig eingegeben hast?")
            return
        }

        var dbsearch = "";
        if (ergebnis.id == 1) {
            dbsearch = "metha"
        } else if (ergebnis.id == 2) {
            dbsearch = "etha"
        } else if (ergebnis.id == 3) {
            dbsearch = "propa"
        } else if (ergebnis.id == 4) {
            dbsearch = "buta"
        } else if (ergebnis.id == 5) {
            dbsearch = "penta"
        } else if (ergebnis.id == 6) {
            dbsearch = "hexa"
        } else if (ergebnis.id == 7) {
            dbsearch = "hepta"
        } else if (ergebnis.id == 8) {
            dbsearch = "octa"
        } else if (ergebnis.id == 9) {
            dbsearch = "nona"
        } else if (ergebnis.id == 10) {
            dbsearch = "deca"
        } else if (ergebnis.id == 11) {
            dbsearch = "ultra"
        }

        //sucht die Anzahl des Materials, die im Besitz von Usern sind
        var allusermats;
        con.query("SELECT " + dbsearch + " FROM htsinv", function (err, result, fields) {
            if (err) throw err;
            allusermats = result
        });

        //sucht alle Elemente die man zu diesem Material verarbeiten kann
        var refineelements = "";
        for (i = 0; i < elements.el.length; i++) {
            if (elements.el[i].azonium == ergebnis.id) {
                refineelements += "``" + elements.el[i].name + "`` Effizienz: **" + (elements.el[i].quant * 10) + "%**\n"
            }
        }

        setTimeout(() => {
            var gesamtmats = 0;
            for (j = 0; j < allusermats.length; j++) {
                var obj = allusermats[j]
                gesamtmats += obj[Object.keys(obj)[0]]
            }

            const materialembed = new Discord.RichEmbed()
                .setTitle("**" + ergebnis.name + "**")
                .setDescription("Hier findest du wichtige Informationen zum Material *" + ergebnis.name + "*")
                .setColor("0xC0C0C0")
                .addField("**Materialname**", ergebnis.name)
                .addField("**Abgekürzt auch**", dbsearch)
                .addField("**Anzahl in Besitz von Spielern**", gesamtmats)
                .addField("**Hergestellt durch**", refineelements)
                .addField("**Beschreibung**", ergebnis.desc)
            receivedMessage.channel.send(materialembed)
        }, 200);
    },
};