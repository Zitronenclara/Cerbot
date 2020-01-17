const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');

module.exports = {
	name: 'profil',
	description: 'Zeigt dir dein oder das Höllenprofil eines beliebigen Users',
	category: 'Stats',
	usage: '``c!profil``, ``c!profil @user``',
	execute(arguments, receivedMessage) {
		if (!receivedMessage.mentions.users.size) {
			var target = receivedMessage.member
		} else {
			var target = receivedMessage.mentions.members.first();
		}
		con.query("SELECT * FROM userdata WHERE usrid = '" + target.id + "'", function (err, result, fields) {
			if (err) throw err;
			var udat = result
			if (udat = undefined || udat.length == 0) {
				var initid = "" + target.id + ""
				receivedMessage.channel.send("Probiere es erneut.")
				const unt = require('./../bot.js');
				unt.dbinitus(target.id);
			} else {
				con.query("SELECT * FROM userdata WHERE usrid = '" + target.id + "'", function (err, result, fields) {
					var xds = result[0].xdcount
					var uwus = result[0].uwucount
					var owos = result[0].owocount
					var seelen = result[0].coins
					var adveg = result[0].advget
					var earn = result[0].earnedc
					var spent = result[0].coinsspent
					var get = result[0].coinsget
					var trans = result[0].coinstrans
					var transget = result[0].coinstransget
					var birthday = result[0].birthdate
					var nextbd = "Mit ``c!bdreminder`` kann man seinen Geburtstag setzen."
					if(birthday !== null){
						var nowdate = new Date(receivedMessage.createdTimestamp + 32400000)
						var nowyear = nowdate.getFullYear()
						var bday = birthday.getDate()
						var bmonth = birthday.getMonth()
						var nextbd = new Date("" + nowyear + "-" + (bmonth + 1) + "-" + bday)
					}
					if (err) throw err;
					const profmes = new Discord.RichEmbed()
						.setTitle("**Höllenprofil**")
						.setColor("0xFF0000")
						.setDescription("Hier siehst du das Höllenprofil von " + target)
						.setThumbnail(target.user.avatarURL)
						.addField("Aktuelle Anzahl von Seelen", "**" + seelen + "**❦")
						.addField("Ingesamt erhaltene Seelen", "**" + get + "**❦")
						.addField("Durch schreiben verdiente Seelen", "**" + earn + "**❦")
						.addField("Insgesamt ausgegebene Seelen", "**" + spent + "**❦")
						.addField("Durch Abenteuer verdiente Seelen", "**" + adveg + "**❦")
						.addField("Durch Transfer abgegebene Seelen", "**" + trans + "**❦")
						.addField("Durch Transfer erhaltene Seelen", "**" + transget + "**❦")
						.addField("Transferbillanz", "**" + (trans - transget) + "**")
						.addField("Gesendete xD", xds)
						.addField("Gesendete uwu", uwus)
						.addField("Gesendete owo", owos)
						.addField("volle Tage auf diesem Server", Math.round((receivedMessage.createdTimestamp - target.joinedTimestamp) / 86400000))
						.addField("Dem Server beigetreten am", target.joinedAt)
						.addField("Account erstellt am", target.user.createdAt)
						.addField("nächster Geburtstag", nextbd)
						.setTimestamp()
					receivedMessage.channel.send(profmes)
				});
			}
		});
	},
};