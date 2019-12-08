const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');

module.exports = {
	name: 'uwu',
	description: 'Zeigt dir deine insgesamt gesendeten uwus',
	category: 'Stats',
    usage: '``c!uwu``',
	execute(arguments, receivedMessage) {
		con.query("SELECT usrid ,uwucount FROM userdata WHERE usrid = '"+receivedMessage.author.id+"'", function (err, result, fields) {
			if (err) throw err;
			receivedMessage.channel.send(""+ receivedMessage.author +" du hast bereits **"+result[0].uwucount+"** uwu's gesendet.")
		});
	},
};