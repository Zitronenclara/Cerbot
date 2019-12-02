const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');

module.exports = {
	name: 'leveltop',
	description: 'shows the level-toplist',
	execute(arguments, receivedMessage) {
		con.query("SELECT usrid ,level ,xp FROM userdata", function (err, result, fields) {
			if (err) throw err;
			rank = [];
			var xpp;
			for (i = 0; i < result.length; i++) {
				xpp = result[i].xp
					x = parseFloat(result[i].level + 1);
					for (j = 1; j < x; j++) {
						xpp = xpp + (5 * (j * j) + 50 * j + 100)
					}
				rank[i] = [result[i].usrid, result[i].level, xpp]
				xpp = 0
			}
			rank.sort(function (a, b) {
				return b[2] - a[2]
			})
			ranks = [];
			y = rank.length;
			for (i = 0; i < result.length; i++) {
				ranks[i] = [rank[i][0], rank[i][1], rank[i][2], i + 1]
			}
			const mestopmes = new Discord.RichEmbed()
				.setTitle("**Höchstes Höllenlevel - Topliste**")
				.setColor(0xFFFF00)
				.addField("**Platz 1**", "<@" + ranks[0][0] + "> ➜ **Level " + ranks[0][1] + "** *("+ranks[0][2]+"xp)*")
				.addField("**Platz 2**", "<@" + ranks[1][0] + "> ➜ **Level " + ranks[1][1] + "** *("+ranks[1][2]+"xp)*")
				.addField("**Platz 3**", "<@" + ranks[2][0] + "> ➜ **Level " + ranks[2][1] + "** *("+ranks[2][2]+"xp)*")
				.addField("**Platz 4**", "<@" + ranks[3][0] + "> ➜ **Level " + ranks[3][1] + "** *("+ranks[3][2]+"xp)*")
				.addField("**Platz 5**", "<@" + ranks[4][0] + "> ➜ **Level " + ranks[4][1] + "** *("+ranks[4][2]+"xp)*")
				.addField("**Platz 6**", "<@" + ranks[5][0] + "> ➜ **Level " + ranks[5][1] + "** *("+ranks[5][2]+"xp)*")
				.addField("**Platz 7**", "<@" + ranks[6][0] + "> ➜ **Level " + ranks[6][1] + "** *("+ranks[6][2]+"xp)*")
				.addField("**Platz 8**", "<@" + ranks[7][0] + "> ➜ **Level " + ranks[7][1] + "** *("+ranks[7][2]+"xp)*")
				.addField("**Platz 9**", "<@" + ranks[8][0] + "> ➜ **Level " + ranks[8][1] + "** *("+ranks[8][2]+"xp)*")
				.addField("**Platz 10**", "<@" + ranks[9][0] + "> ➜ **Level " + ranks[9][1] + "** *("+ranks[9][2]+"xp)*")
				.setTimestamp()
			receivedMessage.channel.send(mestopmes);
		});
		console.log("leveltop command executed")
	},
};