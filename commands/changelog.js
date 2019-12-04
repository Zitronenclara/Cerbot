const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');
var chlogs = require('./../changelog.json')
const config = require('./../config.json')

module.exports = {
	name: 'changelog',
	description: 'Changelog-Message',
	execute(arguments, receivedMessage) {
		var targetver = arguments[0]
		if (targetver == "recent"){
			targetver = config.version
		}
		var vers = ""
		for (i = 0; i < chlogs.versions.length; i++) {
			vers = vers + "``" + chlogs.versions[i].num + "`` "
		}
		if (arguments.length == 0) {
			receivedMessage.reply("Für folgende Bot-Versionen stehen Changelogs zur Verfügung:\n" + vers)
			return
		}
		var chl = chlogs.versions.find(({
			num
		}) => num == targetver)
		if (chl == undefined){
			receivedMessage.reply("es wurde keine Changelog für die Version ``"+targetver+"`` gefunden. Für diese Versionen gibt es Changelogs:\n" + vers)
			return
		}
		const changelogmes = new Discord.RichEmbed()
			.setTitle("**Changelog V"+chl.num+"**")
			.setColor("0xFF0000")
			.setDescription("*"+chl.desc+"*")
			.addField("**Neuerungen**", chl.changes)
		receivedMessage.author.send(changelogmes)
			.catch(() => receivedMessage.channel.send("Du hast Server DM's leider ausgeschalten!"));
		receivedMessage.channel.send("Der Changelog wurde dir per DM geschickt " + receivedMessage.author + ".")
		console.log("changelog command executed")
	},
};