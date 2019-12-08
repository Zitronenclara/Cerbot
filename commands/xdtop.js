const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');

module.exports = {
	name: 'xdtop',
	description: 'shows the xd-toplist',
	execute(arguments, receivedMessage) {
		con.query("SELECT usrid ,xdcount FROM userdata ORDER BY xdcount DESC LIMIT 10", function (err, result, fields) {
			if (err) throw err;
			const mestopmes = new Discord.RichEmbed()
	    	.setTitle("**Gesendete xD - Topliste**")
	    	.setColor(0xFFFF00)
	    	.addField("**Platz 1**", "<@"+result[0].usrid+"> ➜ **"+result[0].xdcount+"** xD's")
	    	.addField("**Platz 2**", "<@"+result[1].usrid+"> ➜ **"+result[1].xdcount+"** xD's")
	    	.addField("**Platz 3**", "<@"+result[2].usrid+"> ➜ **"+result[2].xdcount+"** xD's")
	    	.addField("**Platz 4**", "<@"+result[3].usrid+"> ➜ **"+result[3].xdcount+"** xD's")
	    	.addField("**Platz 5**", "<@"+result[4].usrid+"> ➜ **"+result[4].xdcount+"** xD's")
	    	.addField("**Platz 6**", "<@"+result[5].usrid+"> ➜ **"+result[5].xdcount+"** xD's")
	    	.addField("**Platz 7**", "<@"+result[6].usrid+"> ➜ **"+result[6].xdcount+"** xD's")
	    	.addField("**Platz 8**", "<@"+result[7].usrid+"> ➜ **"+result[7].xdcount+"** xD's")
	    	.addField("**Platz 9**", "<@"+result[8].usrid+"> ➜ **"+result[8].xdcount+"** xD's")
	    	.addField("**Platz 10**", "<@"+result[9].usrid+"> ➜ **"+result[9].xdcount+"** xD's")
	    	.setTimestamp()
	    	receivedMessage.channel.send(mestopmes);
		});
		console.log("xdtop command executed")
	},
};