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
			receivedMessage.channel.send("Pong!").then(mes => {
				var first = receivedMessage.createdTimestamp
				var second = mes.createdTimestamp
				var pingy = second - first
				mes.edit("Pong! ``"+pingy+"ms``")
			})
	},
};