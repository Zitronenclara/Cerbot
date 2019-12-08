const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');

module.exports = {
	name: 'removes',
	description: 'removes souls of user',
	execute(arguments, receivedMessage) {
		if (receivedMessage.author.id == "422716344228642828"){
			var givec = parseFloat(arguments.find(arg => !/<@!?\d+>/g.test(arg)),0);
			var target = receivedMessage.mentions.users.first();
			con.query("SELECT id ,coins, coinsget FROM userdata WHERE usrid = '"+target.id+"'", function (err, result, fields) {
				if (err) throw err;
				var aktucoins = result[0].coins
				var aktucoinsget = result[0].coinsget
				con.query("UPDATE `cerbotdb`.`userdata` SET `coins`=" + (aktucoins - givec) + " WHERE  `id`="+result[0].id+";")
				con.query("UPDATE `cerbotdb`.`userdata` SET `coinsget`=" + (aktucoinsget - givec) + " WHERE  `id`="+result[0].id+";")
				receivedMessage.channel.send(""+target+" wurden **"+givec+"**❦ genommen.")
				const lt = require('./../bot.js');
				lt.logging("0x0000FF", "Währungssystem", "Ein Logeintrag zum Währungssystem", "Seelen wurden genommen", 
						""+receivedMessage.author+" (ID: ``"+receivedMessage.author.id+"``) hat "+target+" (ID: ``"+target.id+"``) **"+givec+"**❦ genommen.");
			});
		    }
	},
};