const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');

module.exports = {
	name: 'timestamp',
	description: 'Schickt dir den Zeitstempel deiner letzten Nachricht',
	category: 'Admin',
    usage: '``c!timestamp``',
	execute(arguments, receivedMessage) {
		if (receivedMessage.author.id == "422716344228642828"){
			receivedMessage.channel.send(receivedMessage.createdTimestamp)}
	},
};