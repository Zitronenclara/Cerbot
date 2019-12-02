const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');

module.exports = {
	name: 'stats',
	description: 'Stat-Message',
	execute(arguments, receivedMessage) {
		con.query("SELECT * FROM userdata", function (err, result, fields) {
			var umlaufc = 0;
			for(i = 0; i < result.length; i++) {
			    umlaufc = umlaufc + parseInt(result[i].coins, 0);
			}
			var servtrans = 0;
			for(i = 0; i < result.length; i++) {
				servtrans = servtrans + parseInt(result[i].coinstrans, 0);
			}
			var servspent = 0;
			for(i = 0; i < result.length; i++) {
				servspent = servspent + parseInt(result[i].coinsspent, 0);
			}
			var servowo = 0;
			for(i = 0; i < result.length; i++) {
				servowo = servowo + parseInt(result[i].owocount, 0);
			}
			var servuwu = 0;
			for(i = 0; i < result.length; i++) {
				servuwu = servuwu + parseInt(result[i].uwucount, 0);
			}
			var servxd = 0;
			for(i = 0; i < result.length; i++) {
				servxd = servxd + parseInt(result[i].xdcount, 0);
			}
			var servget = 0;
			for(i = 0; i < result.length; i++) {
				servget = servget + parseInt(result[i].coinsget, 0);
			}
			var advservg = 0;
			for(i = 0; i < result.length; i++) {
				advservg = advservg + parseInt(result[i].advget, 0);
			}
			var servearn = 0;
			for(i = 0; i < result.length; i++) {
				servearn = servearn + parseInt(result[i].earnedc, 0);
			}
			const statmes = new Discord.RichEmbed()
			.setTitle("**Server-Stats**")
			.setColor("0x000000")
			.setDescription("*Hier siehst du die Server-Statistiken*")
			.addField("**Seelen im Umlauf**", "**"+umlaufc+"**❦")
			.addField("**Seelen insgesamt ausgegeben**", "**"+servspent+"**❦")
			.addField("**Seelen insgesamt übertragen**", "**"+servtrans+"**❦")
			.addField("**Seelen insgesamt erhalten**", "**"+servget+"**❦")
			.addField("**Seelen insgesamt verdient**", "**"+servearn+"**❦")
			.addField("**Seelen insgesamt auf Expeditionen gefunden**", "**"+advservg+"**❦")
			.addField("**Insgesamt gesendet**", "**"+servowo+"** owo's\n" +
					                            "**"+servuwu+"** uwu's\n" +
					                            "**"+servxd+"** xd's")
			receivedMessage.channel.send(statmes)
		    console.log("stats command executed")
		});
	},
};