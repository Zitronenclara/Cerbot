const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');

module.exports = {
	name: 'shop',
	description: 'Schickt dir eine Liste aller kaufbaren Rollen per DM',
	category: 'Währung',
    usage: '``c!shop``',
	execute(arguments, receivedMessage) {
		const shopmes = new Discord.RichEmbed()
		.setTitle("**Shopnachricht**")
		.setColor("0x0000FF")
		.setDescription("*Hier siehst du alle Shop-Items. Mit c!buy [itemnummer], kannst du dir das Item kaufen c: Natürlich ohne die [] schreiben uwu*")
		.addField("**Rollen**", "**Halbluzifer** - *Luzis ehrenvolle Lakeien* [``250000❦``] No.13\n" +
								"**Kekselaos** - *Gott der Kekse* [``150000❦``] No.12\n" +
								"**Zeus** - *Oberster olympischer Gott* [``100000❦``] No.11\n" +
								"**Hades** - *Herrscher der Unterwelt* [``60000❦``] No.10\n" +
				                "**Thanatos** - *Gott des Todes* [``40000❦``] No.9\n" +
				                "**Ares** - *Gott des Krieges* [``25000❦``] No.8\n" +
				                "**Hephaistos** - *Gott des Feuers* [``15000❦``] No.7\n" +
				                "**Nyx** - *Göttin der Nacht* [``10000❦``] No.6\n" +
				                "**Erebos** - *Gott der Finsternis* [``8000❦``] No.5\n" +
				                "**Eris** - *Göttin des Streits* [``5000❦``] No.4\n" +
				                "**Artemis** - *Göttin der Jagd* [``3500❦``] No.3\n" +
				                "**Dionysos** - *Gott des Weines* [``1500❦``] No.2\n" +
				                "**Charon** - *Fährmann der Unterwelt* [``750❦``] No.1\n")
		receivedMessage.author.send(shopmes)
			.catch(() => receivedMessage.channel.send("Du hast Server DM's leider ausgeschalten!"));
		receivedMessage.channel.send(receivedMessage.author +", dir wurde eine Liste aller Shop-Items per DM geschickt.")
	},
};