const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');

module.exports = {
	name: 'werttop',
	description: 'Zeigt dir die Top 10 User mit dem höchsten Gesamtwert in Seelen',
	category: 'Stats',
    usage: '``c!werttop``',
	execute(arguments, receivedMessage) {
		con.query("SELECT usrid, coins, coinsspent FROM userdata", function (err, result, fields) {
            if (err) throw err;
            bil = [];
            z = result.length;
			for(i = 0; i < result.length; i++) {
                bil[i] = [result[i].usrid, (result[i].coins + result[i].coinsspent)]
            }
            bil.sort(function(a, b){return b[1]-a[1]})
			const mestopmes = new Discord.RichEmbed()
	    	.setTitle("**Gesamtwert - Topliste**")
	    	.setColor(0xFFFF00)
	    	.addField("**Platz 1**", "<@"+bil[0][0]+"> ➜ **"+bil[0][1]+"**❦")
	    	.addField("**Platz 2**", "<@"+bil[1][0]+"> ➜ **"+bil[1][1]+"**❦")
	    	.addField("**Platz 3**", "<@"+bil[2][0]+"> ➜ **"+bil[2][1]+"**❦")
	    	.addField("**Platz 4**", "<@"+bil[3][0]+"> ➜ **"+bil[3][1]+"**❦")
	    	.addField("**Platz 5**", "<@"+bil[4][0]+"> ➜ **"+bil[4][1]+"**❦")
	    	.addField("**Platz 6**", "<@"+bil[5][0]+"> ➜ **"+bil[5][1]+"**❦")
	    	.addField("**Platz 7**", "<@"+bil[6][0]+"> ➜ **"+bil[6][1]+"**❦")
	    	.addField("**Platz 8**", "<@"+bil[7][0]+"> ➜ **"+bil[7][1]+"**❦")
	    	.addField("**Platz 9**", "<@"+bil[8][0]+"> ➜ **"+bil[8][1]+"**❦")
	    	.addField("**Platz 10**", "<@"+bil[9][0]+"> ➜ **"+bil[9][1]+"**❦")
	    	.setTimestamp()
	    	receivedMessage.channel.send(mestopmes);
		});
	},
};