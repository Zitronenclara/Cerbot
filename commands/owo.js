const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');

module.exports = {
	name: 'owo',
	description: 'Zeigt dir die Anzahl deiner geschriebenen owos',
	category: 'Stats',
    usage: '``c!owo``',
	execute(arguments, receivedMessage) {
		con.query("SELECT usrid ,owocount FROM userdata WHERE usrid = '"+receivedMessage.author.id+"'", function (err, result, fields) {
			if (err) throw err;
			receivedMessage.channel.send(""+ receivedMessage.author +" du hast bereits **"+result[0].owocount+"** owo's gesendet.")
		});
	    console.log("owo command executed")
	},
};