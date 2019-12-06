const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');

module.exports = {
	name: 'xd',
	description: 'Zeigt dir deine insgesamt geschriebenen xDs',
	category: 'Stats',
    usage: '``c!xd``',
	execute(arguments, receivedMessage) {
		con.query("SELECT usrid ,xdcount FROM userdata WHERE usrid = '"+receivedMessage.author.id+"'", function (err, result, fields) {
			if (err) throw err;
			receivedMessage.channel.send(""+ receivedMessage.author +" du hast bereits **"+result[0].xdcount+"** xd's gesendet.")
		});
	    console.log("xd command executed")
	},
};