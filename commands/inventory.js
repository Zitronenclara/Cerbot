const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');

module.exports = {
	name: 'inventory',
	description: 'Öffnet dein Hell to Space Inventar',
	category: 'Space',
	usage: '``c!inventory``',
	execute(arguments, receivedMessage) {
		if (!receivedMessage.member.roles.find(r => r.name === "Commander")) {
            receivedMessage.reply("du hast noch kein Raumschiff, kaufe dir eins mit ``c!starthts`` c:")
            valid = 0
            return
        }
        
        var usinfo;
        con.query("SELECT * FROM htsinv WHERE userid = '" + receivedMessage.author.id + "'", function (err, result, fields) {
            if (err) throw err;
            usinfo = result[0]
        });

        setTimeout(() => {
            const inventoryembed = new Discord.RichEmbed()
                    .setTitle("**Inventar**")
                    .setDescription("Hier siehst du Infos über das Inventar von " + receivedMessage.author)
                    .setThumbnail(receivedMessage.author.displayAvatarURL)
                    .setColor("0xFF0000")
                    .addField("**Materialien**", "``Methazonium`` ➜ **"+usinfo.metha+"** Stück\n``Ethazonium`` ➜ **"+usinfo.etha+"** Stück\n``Propazonium`` ➜ **"+usinfo.propa+"** Stück\n``Butazonium`` ➜ **"+usinfo.buta+"** Stück\n``Pentazonium`` ➜ **"+usinfo.penta+"** Stück\n``Hexazonium`` ➜ **"+usinfo.hexa+"** Stück\n``Heptazonium`` ➜ **"+usinfo.hepta+"** Stück\n``Octazonium`` ➜ **"+usinfo.octa+"** Stück\n``Nonazonium`` ➜ **"+usinfo.nona+"** Stück\n``Decazonium`` ➜ **"+usinfo.deca+"** Stück\n``Ultrazonium`` ➜ **"+usinfo.ultra+"** Stück\n")
                    .addField("**Drohnen**", "``Abbaudrohnen`` ➜ **"+usinfo.minerdrones+"** Stück\n``Aufklärungsdrohnen`` ➜ **"+usinfo.resolvedrones+"** Stück\n")
            receivedMessage.channel.send(inventoryembed)
        }, 300);
	},
};