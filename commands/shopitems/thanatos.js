const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../../db.js');
const wert = 40000
const name = "Thanatos"
const roleid = "633320268596772866"

let buythanatos = function(mes) {
	con.query("SELECT id ,coins, coinsspent FROM userdata WHERE usrid = '"+mes.author.id+"'", function (err, result, fields) {
		if (err) throw err;
		if (mes.member.roles.has(roleid)){
			mes.channel.send(mes.author+" du hast die Rolle ``"+name+"`` bereits.")
			return
		}
		var aktucoins = result[0].coins;
		var aktucoinsspent = result[0].coinsspent;
		if (aktucoins >= wert) {
			con.query("UPDATE `cerbotdb`.`userdata` SET `coins`=" + (aktucoins - wert) + " WHERE  `id`="+result[0].id+";")
			con.query("UPDATE `cerbotdb`.`userdata` SET `coinsspent`=" + (aktucoinsspent + wert) + " WHERE  `id`="+result[0].id+";")
			mes.member.addRole(roleid)
			mes.channel.send(mes.author+" du hast dir die Rolle ``"+name+"`` **erfolgreich gekauft**. Dir wurden **"+wert+"**❦ genommen.")
			const lt = require('./../../bot.js');
			lt.logging("0x00FF00", "Währungssystem", "Ein Logeintrag zum Währungssystem", "Rolle wurde gekauft", 
			""+mes.author+" (ID: ``"+mes.author.id+"``) hat die Rolle **"+name+"** für **"+wert+"**❦ gekauft.");
		}else{
			mes.channel.send(mes.author+" du kannst dir die Rolle ``"+name+"`` leider nicht leisten, dir fehlen **"+(wert - aktucoins)+"**❦")
		}
	});
}

let sellthanatos = function(mes) {
	con.query("SELECT id ,coins, coinsspent FROM userdata WHERE usrid = '"+mes.author.id+"'", function (err, result, fields) {
		if (err) throw err;
		if (mes.member.roles.has(roleid)){
			var aktucoins = result[0].coins;
			var aktucoinsspent = result[0].coinsspent;
			con.query("UPDATE `cerbotdb`.`userdata` SET `coins`=" + (aktucoins + wert) + " WHERE  `id`="+result[0].id+";")
			con.query("UPDATE `cerbotdb`.`userdata` SET `coinsspent`=" + (aktucoinsspent - wert) + " WHERE  `id`="+result[0].id+";")
			mes.member.removeRole(roleid)
			mes.channel.send(mes.author+" du hast die Rolle ``"+name+"`` **erfolgreich verkauft**. Dir wurden **"+wert+"**❦ hinzugefügt.")
			const lt = require('./../../bot.js');
			lt.logging("0xFF0000", "Währungssystem", "Ein Logeintrag zum Währungssystem", "Rolle wurde verkauft", 
			""+mes.author+" (ID: ``"+mes.author.id+"``) hat die Rolle **"+name+"** für **"+wert+"**❦ verkauft.");
		}else{
			mes.channel.send(mes.author+" du hast die Rolle ``"+name+"`` nicht.")
			return
		}
	});
}

exports.buythanatos = buythanatos;
exports.sellthanatos = sellthanatos;