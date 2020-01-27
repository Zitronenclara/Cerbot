const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');
const randomizer = require('./../planetrandomizer.js')
const elements = require('./../resrates.json')
const materials = require('./../matdesc.json')

module.exports = {
    name: 'elementinfo',
    description: 'Gibt dir bestimmte Informationen über ein Element',
    category: 'Space',
    usage: '``c!elementinfo [elementname]``',
    execute(arguments, receivedMessage) {
        if (arguments.length == 0 || !arguments) {
            receivedMessage.reply("du musst mir schon sagen, über welches Element du Informationen erhalten willst.")
            return
        }

        var element = (arguments[0]).replace(/\b\w/g, l => l.toUpperCase())
        var ergebnis = elements.el.find(e => e.name === element)

        if (ergebnis == undefined) {
            var ergebnis = elements.el.find(e => e.id === parseInt(element))
        }
        if (ergebnis == undefined) {
            receivedMessage.reply("ich konnte das Element ``" + element + "`` leider nicht finden uwu Bist du sicher, dass du es richtig eingegeben hast?")
            return
        }

        var matzuel = materials.mats.find(m => m.id === ergebnis.azonium)
        var pos = ergebnis.id - 1
        var anzahlbekannt;
        var insgesamtanzahl;
        con.query("SELECT * FROM spacebodies WHERE resaid = " + pos + " OR resbid = " + pos + "", function (err, result, fields) {
            if (err) throw err;
            anzahlbekannt = result.length
        });
        con.query("SELECT * FROM spacebodies", function (err, result, fields) {
            if (err) throw err;
            insgesamtanzahl = result.length
        });

        setTimeout(() => {
            const elementembed = new Discord.RichEmbed()
                .setTitle("**" + ergebnis.name + "**")
                .setDescription("Hier findest du wichtige Informationen zum Element *" + ergebnis.name + "*")
                .setColor("0x87CEEB")
                .addField("**Elementname**", ergebnis.name)
                .addField("**Ordnungszahl**", ergebnis.pse)
                .addField("**Abkürzung**", ergebnis.short)
                .addField("**Umwandelbar in**", "``" + matzuel.name + "`` *(Effizienz: " + (ergebnis.quant * 10) + "%)*")
                .addField("**Spawnwahrscheinlichkeit**", "**" + (((ergebnis.num ** 3 - ((ergebnis.num - 1) ** 3)) / (83 ** 3) * 100)).toFixed(6) + "%** bzw. jeder **" + Math.round(83 ** 3 / (ergebnis.num ** 3 - ((ergebnis.num - 1) ** 3))) + ".** Körper beherbergt " + ergebnis.name)
                .addField("**Bekannte Körper mit diesem Element**", "**"+anzahlbekannt+"** von "+insgesamtanzahl)
                .addField("**Beschreibung**", ergebnis.desc)
                .setFooter("ID: #" + ergebnis.id)
            receivedMessage.channel.send(elementembed)
        }, 200);
    },
};