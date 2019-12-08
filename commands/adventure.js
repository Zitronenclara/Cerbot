const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');

module.exports = {
	name: 'adventure',
	description: 'Gibt dir alle 6h eine zufällige Anzahl an Seelen',
	category: 'Währung',
	usage: '``c!adventure``',
	execute(arguments, receivedMessage) {
		const lt = require('./../bot.js');
		lt.dailygain(receivedMessage.author, receivedMessage.channel, receivedMessage.author.id, receivedMessage.createdTimestamp);
	},
};