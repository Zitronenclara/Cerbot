const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');

module.exports = {
	name: 'adventure',
	description: '2x daily souls',
	execute(arguments, receivedMessage) {
		const lt = require('./../bot.js');
		lt.dailygain(receivedMessage.author, receivedMessage.channel, receivedMessage.author.id, receivedMessage.createdTimestamp);
	},
};