const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');

module.exports = {
	name: 'ideen',
	description: 'Schickt dir ein Link zu einem Formular, wo du coole Ideen zum Bot einschicken kannst',
	category: 'Sonstiges',
    usage: '``c!ideen``',
	execute(arguments, receivedMessage) {
		receivedMessage.channel.send(receivedMessage.author +", dir wurde der Link zum Ideen-Formular per DM geschickt.")
		receivedMessage.author.send("Hier ist der Link zum Formular, womit du Ideen einsenden kannst: https://forms.gle/6iwEe3Qd97E8QzRDA")
			.catch(() => receivedMessage.channel.send("Du hast Server DM's leider ausgeschalten!"));
	    console.log("ideen command executed")
	},
};