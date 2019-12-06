const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');

module.exports = {
	name: 'wintop',
	description: 'Zeigt dir die Top 10 User die die meisten Kämpfe gewonnen haben',
	category: 'Kampfsystem',
    usage: '``c!wintop``',
	execute(arguments, receivedMessage) {
		con.query("SELECT usrid ,wins FROM userdata ORDER BY wins DESC LIMIT 10", function (err, result, fields) {
			if (err) throw err;
			const mestopmes = new Discord.RichEmbed()
	    	.setTitle("**Gewonnene Kämpfe - Topliste**")
	    	.setColor(0xFFFF00)
	    	.addField("**Platz 1**", "<@"+result[0].usrid+"> ➜ **"+result[0].wins+"** mal gewonnen")
	    	.addField("**Platz 2**", "<@"+result[1].usrid+"> ➜ **"+result[1].wins+"** mal gewonnen")
	    	.addField("**Platz 3**", "<@"+result[2].usrid+"> ➜ **"+result[2].wins+"** mal gewonnen")
	    	.addField("**Platz 4**", "<@"+result[3].usrid+"> ➜ **"+result[3].wins+"** mal gewonnen")
	    	.addField("**Platz 5**", "<@"+result[4].usrid+"> ➜ **"+result[4].wins+"** mal gewonnen")
	    	.addField("**Platz 6**", "<@"+result[5].usrid+"> ➜ **"+result[5].wins+"** mal gewonnen")
	    	.addField("**Platz 7**", "<@"+result[6].usrid+"> ➜ **"+result[6].wins+"** mal gewonnen")
	    	.addField("**Platz 8**", "<@"+result[7].usrid+"> ➜ **"+result[7].wins+"** mal gewonnen")
	    	.addField("**Platz 9**", "<@"+result[8].usrid+"> ➜ **"+result[8].wins+"** mal gewonnen")
	    	.addField("**Platz 10**", "<@"+result[9].usrid+"> ➜ **"+result[9].wins+"** mal gewonnen")
	    	.setTimestamp()
	    	receivedMessage.channel.send(mestopmes);
		});
	},
};