const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../../db.js');
const wert = 960
const name = "Plutonium"

let buyplutonium = function(mes) {
	con.query("SELECT id, coins, defense, coinsspent FROM userdata WHERE usrid = '"+mes.author.id+"'", function (err, result, fields) {
		if (err) throw err;
		var aktucoins = result[0].coins;
        var aktucoinsspent = result[0].coinsspent;
        var aktudef = result[0].defense;
		if (aktucoins >= wert) {
			con.query("UPDATE `cerbotdb`.`userdata` SET `coins`=" + (aktucoins - wert) + " WHERE  `id`="+result[0].id+";")
            con.query("UPDATE `cerbotdb`.`userdata` SET `coinsspent`=" + (aktucoinsspent + wert) + " WHERE  `id`="+result[0].id+";")
            con.query("UPDATE `cerbotdb`.`userdata` SET `defense`=" + (aktudef + 2) + " WHERE  `id`="+result[0].id+";")
			mes.channel.send(mes.author+" du hast das Item ``"+name+"`` **erfolgreich gekauft**. Dir wurden **"+wert+"**❦ genommen. Deine Verteidigungspunkte wurden um **2** Punkte auf **"+(aktudef + 2)+"** erhöht!")
			const lt = require('./../../bot.js');
			lt.logging("0x00FF00", "Währungssystem", "Ein Logeintrag zum Währungssystem", "Item wurde gekauft", 
			""+mes.author+" (ID: ``"+mes.author.id+"``) hat das Item **"+name+"** für **"+wert+"**❦ gekauft.");
		}else{
			mes.channel.send(mes.author+" du kannst dir das Item ``"+name+"`` leider nicht leisten, dir fehlen **"+(wert - aktucoins)+"**❦.")
		}
	});
}

exports.buyplutonium = buyplutonium;