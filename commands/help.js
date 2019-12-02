const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');

module.exports = {
	name: 'help',
	description: 'Help-Message',
	execute(arguments, receivedMessage) {
		const helpmes = new Discord.RichEmbed()
		.setTitle("**Hilfenachricht**")
		.setColor("0x00FF00")
		.setDescription("*Hier siehst du eine Liste aller Befehle*")
		.addField("**Stats**", "``c!profil`` - Zeigt dir dein Höllenprofil\n" +
					       "``c!profil @user`` - Zeigt dir das Höllenprofil von ``@user``\n" +
					       "``c!owo`` - Zeigt dir deine gesendeten owo's\n" +
					       "``c!uwu`` - Zeigt dir deine gesendeten uwu's\n" +
					       "``c!xd`` - Zeigt dir deine gesendeten xd's\n" +
					       "``c!owotop`` - Zeigt dir die Serverweite owo-Rangliste\n" +
					       "``c!uwutop`` - Zeigt dir die Serverweite uwu-Rangliste\n" +
						   "``c!xdtop`` - Zeigt dir die Serverweite xd-Rangliste\n" +
						   "``c!transtop`` - Zeigt dir die Serverweite Transferbillanz-Rangliste\n" +
						   "``c!werttop`` - Zeigt dir die Serverweite Gesamtwert-Rangliste\n" +
						   "``c!stats`` - Zeigt dir ein paar Server-Statistiken\n" + 
						   "``c!level`` - Zeigt dir dein aktuelles Level\n" +
						   "``c!leveltop`` - Zeigt dir die Serverweite Höllenlevel-Rangliste\n")
		.addField("**Währung**", "``c!seelen`` - Zeigt dir deine aktuellen Seelen\n" +
				                 "``c!seelentop`` - Zeigt dir die Serverweite Seelen-Rangliste\n" +
				                 "``c!shop`` - Schickt dir die Shop-Liste per DM\n" +
				                 "``c!buy [itemnummer]`` - Kauft [itemnummer]\n" +
				                 "``c!sell [rollenname]`` - Verkauft [rollenname]\n" +
				                 "``c!transfer @user [anzahl]`` - Damit schenkst du @user [anzahl]❦\n" +
				                 "``c!adventure`` - Gibt dir alle 8h random Seelen\n")
		.addField("**Sonstiges**", "``c!help`` - Zeigt dir diese Nachricht\n" +
				                   "``c!changelog`` - Schickt dir den Changelog des Bots per DM\n" +
								   "``c!ideen`` - Schickt dir das Formular zum Einsenden von Ideen zum Bot\n" +
								   "``c!alias [befehl]`` - Zeigt dir andere Möglichkeiten um [befehl] aufzurufen\n")
		.addField("**Kampf-System**", "``c!fight @user`` - Fordert @user zu einem Kampf heraus (bitte nur in einem Channel benutzen, in dem aktuell kein anderer Kampf läuft)\n" +
									  "``c!battlestats`` - Zeigt dir deine Kampf-Statistiken\n" +
									  "``c!battlestats @user`` - Zeigt dir die Kampf-Statistiken von @user\n" +
									  "``c!battleshop`` - Schickt dir die Kampfshop-Liste per DM\n" +
									  "``c!downgrade`` - Zeigt dir Informationen darüber, wie du Kampf-Upgrades (die du im Kampfshop gekauft hast) wieder zurückerstatten kannst\n" +
									  "``c!wintop`` - Zeigt dir die User mit den meisten Siegen\n" +
									  "``c!losetop`` - Zeigt dir die User mit den meisten Niederlagen\n")
        .addField("**Steckbriefe**", "``c!userinfo @user`` - Zeigt dir den Steckbrief von @user\n" +
									 "``c!setrealname [name]`` - Setzt deinen echten Namen auf deinem Steckbrief zu [name]\n" +
									 "``c!setnickname [spitzname]`` - Setzt deinen Spitznamen auf deinem Steckbrief zu [spitzname]\n" +
									 "``c!setbd [geburtstag]`` - Setzt deinen Geburtstag auf deinem Steckbrief zu [geburtstag]\n" +
								     "``c!setfavcol [lieblingsfarbe]`` - Setzt deine Lieblingsfarbe auf deinem Steckbrief zu [lieblingsfarbe]\n" +
									 "``c!setgender [geschlecht]`` - Setzt dein Geschlecht auf deinem Steckbrief zu [geschlecht]\n" +
									 "``c!setsize [körpergröße]`` - Setzt deine Körpergröße auf deinem Steckbrief zu [körpergröße]\n" +
									 "``c!sethobbys [hobbys]`` - Setzt deine Hobbys auf deinem Steckbrief zu [hobbys]\n" +
								     "``c!setdesc [beschreibung]`` - Setzt deine Beschreibung auf deinem Steckbrief zu [beschreibung]\n")
		receivedMessage.channel.send(helpmes)
	    console.log("help command executed")
	},
};