const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');

module.exports = {
	name: 'help',
	description: 'Ein Nachschlagewerk für alle existierenden Befehle',
	category: 'Sonstiges',
    usage: '``c!help``',
	execute(arguments, receivedMessage) {
		const categories = ["Stats", "Währung", "Sonstiges", "Kampfsystem", "Steckbriefe", "Admin"]
		var commandObject = require('./../bot.js');

		if (arguments.length == 0){
			receivedMessage.reply("gib ``c!help [befehl]`` ein oder suche Befehle nach Kategorien. Es gibt folgende Kategorien:\n``Stats`` ``Währung`` ``Sonstiges`` ``Kampfsystem`` ``Steckbriefe``")
			return
		}
		var search = arguments[0].charAt(0).toUpperCase() + arguments[0].slice(1)
		
		if (categories.includes(search)){
			let befehle = Array.from(commandObject.commandObject.filter(o => o.category == search).entries())
			var help = "";
			for (i = 0; i < befehle.length; i++){
				help = help + "❥ ``c!"+befehle[i][1].name+"`` - **"+befehle[i][1].description+"**\n"
			}
			const helpembed = new Discord.RichEmbed()
				.setTitle("**Hilfenachricht**")
				.setColor("0x00FF00")
				.setDescription("Hier siehst du alle Befehle der Kategorie **"+search+"**")
				.addField("***Befehle***", help);
				receivedMessage.channel.send(helpembed)
		}else{
			search = search.toLowerCase()
			let befehl = Array.from(commandObject.commandObject.filter(o => o.name == search))
			if (befehl.length == 0){
				receivedMessage.reply("dieser Befehl existiert nicht.")
				return
			}
			befehl = befehl[0][1]
			const helpembed = new Discord.RichEmbed()
				.setTitle("**Hilfenachricht**")
				.setColor("0x00FF00")
				.setDescription("Hier siehst du alle wichtigen Befehlsinfos")
				.addField("**Befehlsname**", "**c!"+befehl.name+"**")
				.addField("**Beschreibung**", "**"+befehl.description+"**")
				.addField("**Verwendung**", befehl.usage);
				receivedMessage.channel.send(helpembed)
		}
	},
};