const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');

module.exports = {
		name: 'initus',
		description: 'secret',
		execute(arguments, receivedMessage) {
			if (receivedMessage.author.id == "422716344228642828"){
				var target = receivedMessage.mentions.members.first()
				var sql = "INSERT INTO userdata (usrid, coins, coinsget, coinsspent, coinstrans, coinstransget, xdcount, uwucount, owocount, advget, earnedc) VALUES ("+target.id+", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)";
				  con.query(sql, function (err, result) {
				    if (err) throw err;
				    console.log("User "+target.id+" added to the Database");
				  });
				}
		},
	};