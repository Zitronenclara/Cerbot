const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');

module.exports = {
	name: 'resetbd',
	description: 'Setzt den Geburtstag eines beliebigen Users zurück',
	category: 'Admin',
    usage: '``c!resetbd @user``',
	execute(arguments, receivedMessage) {
		if (receivedMessage.author.id == "422716344228642828"){
			var target = receivedMessage.mentions.users.first();
			con.query("SELECT id ,birthdate FROM userdata WHERE usrid = '"+target.id+"'", function (err, result, fields) {
				if (err) throw err;
				con.query("UPDATE `cerbotdb`.`userdata` SET `birthdate`= NULL WHERE  `id`="+result[0].id+";")
				receivedMessage.channel.send("Der Geburtstag von "+target+" wurde zurückgesetzt.")
				const lt = require('./../bot.js');
				lt.logging("0x0000FF", "Geburtstagssystem", "Ein Logeintrag zum Geburtstagssystem", "Geburtstag wurde zurückgesetzt", 
						""+receivedMessage.author+" (ID: ``"+receivedMessage.author.id+"``) hat den Geburtstag von "+target+" (ID: ``"+target.id+"``) zurückgesetzt.");
			});
		    }
	},
};