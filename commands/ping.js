const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');
const lt = require('./../bot.js');

module.exports = {
	name: 'ping',
	description: 'Testet die aktuelle Verbindung vom Bot zum Server',
	category: 'Sonstiges',
    usage: '``c!ping``',
	execute(arguments, receivedMessage) {
			var clientThing = require('./../bot.js');
			receivedMessage.channel.send("Pong! ``"+(clientThing.clientThing.ping).toFixed(2)+"ms``")
	},
};