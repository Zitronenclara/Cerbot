const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');

module.exports = {
	name: 'losetop',
	description: 'Zeigt dir die Top 10 der Leute, die am meisten Niederlagen kassiert haben',
	category: 'Kampfsystem',
    usage: '``c!losetop``',
	execute(arguments, receivedMessage) {
		con.query("SELECT usrid ,loses FROM userdata ORDER BY loses DESC LIMIT 10", function (err, result, fields) {
			if (err) throw err;
			const mestopmes = new Discord.RichEmbed()
	    	.setTitle("**verlorene Kämpfe - Topliste**")
	    	.setColor(0xFFFF00)
	    	.addField("**Platz 1**", "<@"+result[0].usrid+"> ➜ **"+result[0].loses+"** mal verloren")
	    	.addField("**Platz 2**", "<@"+result[1].usrid+"> ➜ **"+result[1].loses+"** mal verloren")
	    	.addField("**Platz 3**", "<@"+result[2].usrid+"> ➜ **"+result[2].loses+"** mal verloren")
	    	.addField("**Platz 4**", "<@"+result[3].usrid+"> ➜ **"+result[3].loses+"** mal verloren")
	    	.addField("**Platz 5**", "<@"+result[4].usrid+"> ➜ **"+result[4].loses+"** mal verloren")
	    	.addField("**Platz 6**", "<@"+result[5].usrid+"> ➜ **"+result[5].loses+"** mal verloren")
	    	.addField("**Platz 7**", "<@"+result[6].usrid+"> ➜ **"+result[6].loses+"** mal verloren")
	    	.addField("**Platz 8**", "<@"+result[7].usrid+"> ➜ **"+result[7].loses+"** mal verloren")
	    	.addField("**Platz 9**", "<@"+result[8].usrid+"> ➜ **"+result[8].loses+"** mal verloren")
	    	.addField("**Platz 10**", "<@"+result[9].usrid+"> ➜ **"+result[9].loses+"** mal verloren")
	    	.setTimestamp()
	    	receivedMessage.channel.send(mestopmes);
		});
	},
};