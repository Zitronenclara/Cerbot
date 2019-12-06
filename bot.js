const fs = require('fs');
const Discord = require('discord.js')
var mysql = require('mysql');
var synonym = require('./synonyms.json')
var stringSimilarity = require('string-similarity');
const con = require('./db.js')
const config = require('./config.json')
const synonyms = JSON.parse(JSON.stringify(synonym))

con.connect(function (err) {
	if (err) throw err;
	console.log("Database connected!");
});

const client = new Discord.Client()
client.commands = new Discord.Collection();
client.login(config.token)

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}
exports.commandObject = client.commands

const ccget = new Set();
const xpget = new Set();
const owoget = new Set();
const uwuget = new Set();
const xdget = new Set();
const xdword = "XD";
const owoword = "OWO";
const uwuword = "UWU";

client.on('ready', () => {
	console.log("Bot online")
	client.user.setActivity('gib c!help ein c:', {
		type: 'PLAYING'
	})
})

client.on('typingStart', (ch, us) => {
	con.query("SELECT * FROM userdata WHERE usrid = '" + us.id + "'", function (err, result, fields) {
		if (err) throw err;
		var udat = result
		if (udat = undefined || udat.length == 0) {
			dbinitus(us.id);
		}
	});
})

client.on('message', (receivedMessage) => {
	if (receivedMessage.author.bot) {
		return
	}
	if (receivedMessage.channel instanceof Discord.DMChannel) {
		return
	}
	if (receivedMessage.member.id !== null) {
		var usrid = receivedMessage.member.id
		con.query("SELECT * FROM userdata WHERE usrid = '" + usrid + "'", function (err, result, fields) {
			if (err) throw err;
			var udat = result
			if (udat = undefined || udat.length == 0) {
				var initid = "" + receivedMessage.member.id + ""
				dbinituser(initid);
			} else {
				var msgup = receivedMessage.content.toUpperCase();
				if (msgup.includes(xdword)) {
					if (xdget.has(receivedMessage.author.id)) {} else {
						gainXD(receivedMessage.author.id)
						xdget.add(receivedMessage.author.id);
						setTimeout(() => {
							xdget.delete(receivedMessage.author.id);
						}, 30000);
					}
				} else if (msgup.includes(owoword)) {
					if (owoget.has(receivedMessage.author.id)) {} else {
						gainOWO(receivedMessage.author.id)
						owoget.add(receivedMessage.author.id);
						setTimeout(() => {
							owoget.delete(receivedMessage.author.id);
						}, 30000);
					}
				} else if (msgup.includes(uwuword)) {
					if (uwuget.has(receivedMessage.author.id)) {} else {
						gainUWU(receivedMessage.author.id)
						uwuget.add(receivedMessage.author.id);
						setTimeout(() => {
							uwuget.delete(receivedMessage.author.id);
						}, 30000);
					}
				}
				if (!msgup.includes("C!")) {
					gaincoins(receivedMessage.author.id);
					gainxp(receivedMessage.author.id, receivedMessage.channel, receivedMessage.author);
				}
			}
		});
	}
	if (receivedMessage.content.startsWith("c!")) {
		processCommand(receivedMessage)
	}
})


function processCommand(receivedMessage) {
	let fullCommand = receivedMessage.content.substr(2) // Remove the leading exclamation mark
	let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
	let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
	let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

	console.log("Command received >>> " + primaryCommand + "(args: " + arguments + ") from " + receivedMessage.author.username + " [ID: " + receivedMessage.author.id + "]")
	var simila = [];
	for (i = 0; i < synonyms.syn.length; i++) {
		simila[i] = [synonyms.syn[i].set, stringSimilarity.compareTwoStrings(primaryCommand, synonyms.syn[i].set)]
	}
	simila.sort(function (a, b) {
		return b[1] - a[1]
	})

	var similb = [];
	for (i = 0; i < synonyms.syn.length; i++) {
		var simi = stringSimilarity.findBestMatch(primaryCommand, synonyms.syn[i].get)
		similb[i] = [synonyms.syn[i].set, simi.bestMatch.target, simi.bestMatch.rating]
	}
	similb.sort(function (a, b) {
		return b[2] - a[2]
	})

	var similarat = simila[0][1]
	var similbrat = similb[0][2]
	var similatarg = simila[0][0]
	var similbtarg = similb[0][0]

	if (similarat == 0 && similbrat == 0) {
		receivedMessage.channel.send(receivedMessage.author + ", ich hab keine Ahnung, was du von mir willst xD Der Befehl ist extrem falsch geschrieben oder existiert nicht uwu Gib nochmal ``c!help`` ein, um eine Liste aller Befehle zu erhalten c:")
		return
	}

	if (similarat >= similbrat) {
		if (similarat == 1) {
			primaryCommand = similatarg
		}else if(similarat > 0.4){
			primaryCommand = similatarg
			receivedMessage.channel.send(receivedMessage.author + ", ich habe ``c!" + similatarg + "`` erkannt. (" + (Math.round(similarat * 100)) + "% Übereinstimmung)")
		} else {
			receivedMessage.channel.send(receivedMessage.author + ", meintest du ``c!" + similatarg + "``? (" + (Math.round(similarat * 100)) + "% Übereinstimmung)")
			primaryCommand = "wwwww"
		}
	} else {
		if (similbrat == 1) {
			primaryCommand = similbtarg
		}else if(similbrat > 0.4){
			primaryCommand = similbtarg
			receivedMessage.channel.send(receivedMessage.author + ", ich habe ``c!" + similbtarg + "`` erkannt. (" + (Math.round(similbrat * 100)) + "% Übereinstimmung)")
		} else {
			receivedMessage.channel.send(receivedMessage.author + ", meintest du ``c!" + similbtarg + "``? (" + (Math.round(similbrat * 100)) + "% Übereinstimmung)")
			primaryCommand = "wwwww"
		}
	}
	if (!client.commands.has(primaryCommand)){
		console.log("command not found")
		return
	}

	try {
		client.commands.get(primaryCommand).execute(arguments, receivedMessage);
		console.log("tried to execute "+primaryCommand+" command")
	} catch (error) {
		console.error(error);
		receivedMessage.reply('Ein unerwarteter Fehler ist aufgetreten!');
	}
}

function testCommand(arguments, receivedMessage) {
	if (ccget.has(receivedMessage.author.id)) {
		receivedMessage.channel.send("Warte eine Minute, bevor du diesen Befehl erneut benutzen kannst. - " + receivedMessage.author);
	} else {

		// the user can type the command ... your command code goes here :)
		receivedMessage.channel.send("Test akzeptiert, warte eine Minute!")
		// Adds the user to the set so that they can't talk for a minute
		ccget.add(receivedMessage.author.id);
		setTimeout(() => {
			// Removes the user from the set after a minute
			ccget.delete(receivedMessage.author.id);
		}, 60000);
	}
}

function dbinituser(usid) {
	var sql = "INSERT INTO userdata (usrid, coins, coinsget, coinsspent, coinstrans, coinstransget, xdcount, uwucount, owocount, advget, earnedc) VALUES (" + usid + ", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)";
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("User " + usid + " added to the Database");
	});
}

let dbinitus = function (usid) {
	var sql = "INSERT INTO userdata (usrid, coins, coinsget, coinsspent, coinstrans, coinstransget, xdcount, uwucount, owocount, advget, earnedc) VALUES (" + usid + ", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)";
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("User " + usid + " added to the Database");
	});
}
exports.dbinitus = dbinitus;

function gainXD(usid) {
	con.query("SELECT id,xdcount FROM userdata WHERE usrid = '" + usid + "'", function (err, result, fields) {
		if (err) throw err;
		var newbetr = result[0].xdcount + 1
		con.query("UPDATE `cerbotdb`.`userdata` SET `xdcount`=" + newbetr + " WHERE  `id`=" + result[0].id + ";")
	});
}

function gainUWU(usid) {
	con.query("SELECT id,uwucount FROM userdata WHERE usrid = '" + usid + "'", function (err, result, fields) {
		if (err) throw err;
		var newbetr = result[0].uwucount + 1
		con.query("UPDATE `cerbotdb`.`userdata` SET `uwucount`=" + newbetr + " WHERE  `id`=" + result[0].id + ";")
	});
}

function gainOWO(usid) {
	con.query("SELECT id,owocount FROM userdata WHERE usrid = '" + usid + "'", function (err, result, fields) {
		if (err) throw err;
		var newbetr = result[0].owocount + 1
		con.query("UPDATE `cerbotdb`.`userdata` SET `owocount`=" + newbetr + " WHERE  `id`=" + result[0].id + ";")
	});
}

function gaincoins(usid) {
	if (ccget.has(usid)) {

	} else {

		// the user can type the command ... your command code goes here :)
		con.query("SELECT id, coins, earnedc, level FROM userdata WHERE usrid = '" + usid + "'", function (err, result, fields) {
			if (err) throw err;
			var rando = Math.floor(Math.random() * 10 + result[0].level) + 1
			var newbetr = result[0].coins + rando
			var newearnedc = result[0].earnedc + rando
			con.query("UPDATE `cerbotdb`.`userdata` SET `coins`=" + newbetr + " WHERE  `id`=" + result[0].id + ";")
			con.query("UPDATE `cerbotdb`.`userdata` SET `earnedc`=" + newearnedc + " WHERE  `id`=" + result[0].id + ";")
		});
		// Adds the user to the set so that they can't talk for a minute
		ccget.add(usid);
		setTimeout(() => {
			// Removes the user from the set after a minute
			ccget.delete(usid);
		}, 60000);
	}
}

function gainxp(usid, ch, aut) {
	if (xpget.has(usid)) {

	} else {

		// the user can type the command ... your command code goes here :)
		con.query("SELECT id, xp, level FROM userdata WHERE usrid = '" + usid + "'", function (err, result, fields) {
			if (err) throw err;
			var rando = Math.floor(Math.random() * 15) + 1
			var newxp = result[0].xp + rando
			var forlevel = result[0].level + 1
			if (newxp >= (5 * (forlevel * forlevel) + 50 * forlevel + 100)) {
				con.query("UPDATE `cerbotdb`.`userdata` SET `level`=" + (result[0].level + 1) + " WHERE  `id`=" + result[0].id + ";")
				con.query("UPDATE `cerbotdb`.`userdata` SET `xp`=" + 0 + " WHERE  `id`=" + result[0].id + ";")
				ch.send(aut + ", dein inneres Äther ist am Überkochen. Damit du nicht explodierst wird dein Höllenlevel um eins erhöht. Du bist jetzt **Level " + (result[0].level + 1) + "**!")
			} else {
				con.query("UPDATE `cerbotdb`.`userdata` SET `xp`=" + newxp + " WHERE  `id`=" + result[0].id + ";")
			}
		});
		// Adds the user to the set so that they can't talk for a minute
		xpget.add(usid);
		setTimeout(() => {
			// Removes the user from the set after a minute
			xpget.delete(usid);
		}, 30000);
	}
}

let dailygain = function (us, ch, usid, tstamp) {
	var cgeta = require('./randomadv.js');
	var cmesa = require('./randomadv.js');
	con.query("SELECT id, coins, advget, dailystamp FROM userdata WHERE usrid = '" + usid + "'", function (err, result, fields) {
		if (err) throw err;
		var cget = cgeta.cget
		var cmes = cmesa.cmes
		var aktucoins = result[0].coins
		var userts = result[0].dailystamp
		if (userts == 0 || tstamp > userts) {
			con.query("UPDATE `cerbotdb`.`userdata` SET `advget`=" + (result[0].advget + cget) + " WHERE  `id`=" + result[0].id + ";");
			con.query("UPDATE `cerbotdb`.`userdata` SET `coins`=" + (aktucoins + cget) + " WHERE  `id`=" + result[0].id + ";")
			con.query("UPDATE `cerbotdb`.`userdata` SET `dailystamp`=" + (tstamp + 21600000) + " WHERE  `id`=" + result[0].id + ";")
			ch.send(us + cmes);
		} else {
			var timeleft = Math.round((userts - tstamp) / 1000 / 60)
			var a = new Date(userts + 32400000)
			var month = a.getMonth();
			var date = a.getDate();
			var hours = a.getHours();
			if (hours < 10) {
				hours = "0" + hours
			}
			var minutes = a.getMinutes();
			if (minutes < 10) {
				minutes = "0" + minutes
			}
			var seconds = a.getSeconds();
			if (seconds < 10) {
				seconds = "0" + seconds
			}
			ch.send(us + ", du musst noch **" + timeleft + " Minuten** warten, bevor du erneut auf Expedition gehen kannst. [``am " + date + "." + (month + 1) + ". um " + (hours) + ":" + minutes + ":" + seconds + " Uhr``]")
		}
	});
	const it = require('./randomadv.js');
	it.advran();
}
exports.dailygain = dailygain;

let logging = function (color, tit, desc, ftit, fdesc) {
	const logch = client.channels.get("634011755021991961")
	const logmes = new Discord.RichEmbed()
		.setColor(color)
		.setTitle(tit)
		.setDescription(desc)
		.addField(ftit, fdesc)
		.setTimestamp()
	logch.send(logmes)
}
exports.logging = logging;