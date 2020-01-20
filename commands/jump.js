const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');
const randomizer = require('./../planetrandomizer.js')
const store = new Set();
const rrates = require('./../resrates.json')

module.exports = {
    name: 'jump',
    description: 'Jump!',
    category: 'Space',
    usage: '``c!jump``',
    execute(arguments, receivedMessage) {
        receivedMessage.channel.send("Sprung wird vorbereitet").then(mes => {
            setTimeout(() => {
                mes.edit("Sprung wird vorbereitet.")
            }, 100);
            setTimeout(() => {
                mes.edit("Sprung wird vorbereitet..")
            }, 200);
            setTimeout(() => {
                mes.edit("Sprung wird vorbereitet...")
            }, 300);
            setTimeout(() => {
                mes.edit("Heisenberg-Quantenantrieb aufgeladen")
            }, 500);
            setTimeout(() => {
                mes.edit("Initialisiere Sprung")
            }, 700);
            setTimeout(() => {
                mes.edit("Initialisiere Sprung.")
            }, 800);
            setTimeout(() => {
                mes.edit("Initialisiere Sprung..")
            }, 900);
            setTimeout(() => {
                mes.edit("Initialisiere Sprung...")
            }, 1000);
            setTimeout(() => {
                mes.delete()
            }, 1100);
        })
        var foundbodyname = randomizer.randname()
        var props = randomizer.randsize()
        var size = props.size
        var art = props.art
        var type = props.type
        var comp = props.compared
        var comparate = props.comparedrate
        var res = randomizer.randres(comparate, type)
        var atmo = randomizer.randatmo(type)
        var temps = randomizer.randtemp(type, size, atmo.arate)
        var grav = randomizer.gravitation(size)
        var magnetfield = randomizer.magneticfield(size)
        var habit = randomizer.habitacalc(type, atmo.aart, temps.tempart, grav, temps.waterart, magnetfield.magnetart)
        var esi = randomizer.esicalc(type, grav, temps.temp, atmo.arate, temps.water, temps.waterart, size, magnetfield.magnet)
        var wert = randomizer.wertcomputing(type, res[0].amount, res[1].amount, res[0].place, res[1].place, esi)
        var time = randomizer.rottime(type, size)
        var anomaly = randomizer.anomaly(type, comparate, atmo.arate)
        //speichert den neu erstellen Körper in die Datenbank
        var sql = "INSERT INTO spacebodies (fountid, name, type, art, comp, size, comprate, resaname, resbname, resaamount, resbamount, resaid, resbid, resakons, resbkons, resarar, resbrar, wert, atmrate, atmart, temp, tempart, grav, water, waterart, esi, habitability, magnet, magnetart, rothours, rottext, anomaly, anowert) VALUES (" + receivedMessage.author.id + ", '" + foundbodyname + "', " + type + ", '" + art + "', '" + comp + "', " + size + ", " + comparate + ", '" + res[0].name + "', '" + res[1].name + "', " + res[0].amount + ", " + res[1].amount + ", " + res[0].place + ", " + res[1].place + ", '" + res[0].kons + "', '" + res[1].kons + "', '"+res[0].rarity+"', '"+res[1].rarity+"', "+wert+", "+atmo.arate+", '"+atmo.aart+"', "+temps.temp+", '"+temps.tempart+"', "+grav+", "+temps.water+", '"+temps.waterart+"', "+esi+", '"+habit+"', "+magnetfield.magnet+", '"+magnetfield.magnetart+"', "+time.hours+", '"+time.hourstext+"', '"+anomaly.name+"', "+anomaly.wert+")";
        con.query(sql, function (err, result) {
            if (err) throw err;
        });

        //holt sich die ID des neuen Körpers
        con.query("SELECT id, fountid FROM spacebodies WHERE fountid = '" + receivedMessage.author.id + "' ORDER BY id DESC LIMIT 1", function (err, result, fields) {
            if (err) throw err;
            neworbit = result[0].id
            store.add(neworbit)
        });

        //setzt den User in den Orbit vom neuen Körper
        con.query("SELECT id, usrid, orbitid FROM userdata WHERE usrid = '" + receivedMessage.author.id + "'", function (err, result, fields) {
            if (err) throw err;
            con.query("UPDATE `cerbotdb`.`userdata` SET `orbitid`=" + (store.values().next().value) + " WHERE  `id`=" + result[0].id + ";");
            store.delete(store.values().next().value)
        });
        console.log("==={"+foundbodyname+" added to spacebodies database}===")

        //erstellt das Embed zum senden
        setTimeout(() => {
            randomizer.jumpembedgenerator(receivedMessage.author.id, neworbit, receivedMessage.channel, receivedMessage.author.displayAvatarURL)
        }, 100);

        /*setTimeout(() => {
        con.query("SELECT * FROM spacebodies WHERE fountid = '" + receivedMessage.author.id + "' ORDER BY id DESC LIMIT 1;", function (err, result, fields) {
            var erdwert = Math.round((result[0].atmrate - 1) * 100)
            if (erdwert < 0){
                erdwert = 0
            }
            const bodyembed = new Discord.RichEmbed()
                .setTitle(result[0].art+" ***" + result[0].name + "***")
                .setDescription("*Du bist in einem Orbit um " + result[0].name + " eingeschwenkt.*")
                .setThumbnail(receivedMessage.author.displayAvatarURL)
                .setColor("0x000000")
                .addField("**Durchmesser**", "" + result[0].size + "km (*" + result[0].comp + "*)")
                .addField("**Ressourcen**", "**"+result[0].resaname+"** *("+Math.round(result[0].resaamount * 100)+"%)* - ``"+result[0].resakons+"`` Seltenheit: **"+result[0].resarar+"**\n**"+result[0].resbname+"** *("+Math.round(result[0].resbamount * 100)+"%)* - ``"+result[0].resbkons+"`` Seltenheit: **"+result[0].resbrar+"**")
                .addField("**Gravitation**", ""+result[0].grav+"G")
                .addField("**Atmosphäre**", "``"+result[0].atmart+"`` *("+erdwert+"%)*")
                .addField("**Rotationsdauer**", result[0].rottext)
                .addField("**Wassergehalt**", "``"+result[0].water+"%`` *("+result[0].waterart+")*")
                .addField("**Oberflächentemperatur**", ""+result[0].temp+"°C *("+result[0].tempart+")*")
                .addField("**Magnetfeld**", "effektive Stärke: **"+result[0].magnet+"** *("+result[0].magnetart+")*")
                .addField("**Erdähnlichkeit**", "**"+result[0].esi+"%**")
                .addField("**Wert**", "**"+result[0].wert+"⍟**")
                .addField("**Bewohnbarkeit**", result[0].habitability)
                .addField("**Anomalien**", "**[** ***"+result[0].anomaly+"*** **]** ``"+result[0].anowert+"FP``")
                .setFooter("ID: #"+result[0].id+"")
            receivedMessage.channel.send(bodyembed)
        });
        }, 1200)*/
    },
};