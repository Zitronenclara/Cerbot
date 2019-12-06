const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');

module.exports = {
	name: 'ping',
	description: 'Pong!',
	category: 'Admin',
    usage: '``c!ping``',
	execute(arguments, receivedMessage) {
		if (receivedMessage.author.id == "422716344228642828"){
			receivedMessage.channel.send("Pong!")
		    console.log("ping command executed")}
	},
};