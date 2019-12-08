const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');

module.exports = {
	name: 'seelen',
	description: 'Zeigt dir deine aktuelle Anzahl an Seelen',
	category: 'Währung',
    usage: '``c!seelen``',
	execute(arguments, receivedMessage) {
		con.query("SELECT usrid ,coins FROM userdata WHERE usrid = '"+receivedMessage.author.id+"'", function (err, result, fields) {
			if (err) throw err;
			receivedMessage.channel.send(""+ receivedMessage.author +" du bist aktuell im Besitz von **"+result[0].coins+"**❦.")
		});
	},
};