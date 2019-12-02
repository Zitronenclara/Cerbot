const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');

module.exports = {
    name: 'downgrade',
    description: 'Information about downgrading Battlestats!',
    execute(arguments, receivedMessage) {
        const downgrademes = new Discord.RichEmbed()
            .setTitle("**Battlestats downgraden?**")
            .setDescription("*Informationen über das downgraden der Battlestats*")
            .setColor("0x00FF00")
            .addField("**HP-Downgrade**", "Befehl: ``c!downhp [anzahl]``\n" +
                "verringert deine maximalen HP um ``[anzahl]`` (müssen nach downgrade mind. 30 sein)\n" +
                "pro downgegradeter HP-Punkt werden dir **90**❦ gutgeschrieben.\n")
            .addField("**ATK-Downgrade**", "Befehl: ``c!downatk [anzahl]``\n" +
                "verringert deine Angriffspunkte um ``[anzahl]`` (müssen nach downgrade mind. 5 sein)\n" +
                "pro downgegradeter ATK-Punkt werden dir **250**❦ gutgeschrieben.\n")
            .addField("**DEF-Downgrade**", "Befehl: ``c!downdef [anzahl]``\n" +
                "verringert deine Verteidigungspunkte um ``[anzahl]`` (müssen nach downgrade mind. 0 sein)\n" +
                "pro downgegradeter DEF-Punkt werden dir **450**❦ gutgeschrieben.\n")
        receivedMessage.channel.send(downgrademes)
        console.log("downgrade command executed")
    },
};