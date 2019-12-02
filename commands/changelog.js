const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');

module.exports = {
	name: 'changelog',
	description: 'Changelog-Message',
	execute(arguments, receivedMessage) {
		const changelogmesc = new Discord.RichEmbed()
		.setTitle("**Changelog V1.2**")
		.setColor("0xFF0000")
		.setDescription("*Cerbot V1.2 [17.10.2019]*")
		.addField("**Neuerungen**", "❥ c!stats steht jetzt in der Help-Message\n" +
									"❥ in c!stats wurde die Statistik besser angepasst\n" +
									"❥ Rechtschreibfehler in einigen c!adventure Events wurden behoben\n" +
									"❥ Man kann sich selbst keine Seelen mehr überweisen xDD\n" +
									"❥ zu c!profil wurde ein neues Feld ``Transferbillanz`` hinzugefügt\n" +
									"❥ ``c!transtop`` wurde hinzugefügt\n" +
									"❥ man sieht jetzt exakt, wann man c!adventure erneut verwenden kann\n" +
									"❥ weitere kleinere Optimierungen und Fehlerbehebungen")
		const changelogmesd = new Discord.RichEmbed()
		.setTitle("**Changelog V1.3**")
		.setColor("0xFF0000")
		.setDescription("*Cerbot V1.3 [17.10.2019]*")
		.addField("**Neuerungen**", "❥ Fehlerbehebungen bei der c!adventure Zeitstempel Generierung\n" +
									"❥ Die Uhrzeit vom c!adventure Cooldown wurde ein wenig verschönert (statt z.B. 7:8:6 Uhr jetzt 07:08:06 Uhr)\n" +
									"❥ Die Toplisten wurden etwas verschönert\n" +
									"❥ c!profil wurde etwas angepasst\n" +
									"❥ Es wurden 5 neue Events zu c!adventure hinzugefügt (Insgesamt 80)\n" +
									"❥ ``c!werttop`` wurde hinzugefügt\n")
		const changelogmese = new Discord.RichEmbed()
		.setTitle("**Changelog V1.4**")
		.setColor("0xFF0000")
		.setDescription("*Cerbot V1.4 [19.10.2019]*")
		.addField("**Neuerungen**", "❥ Es gibt jetzt **KÄMPFE** mit ``c!fight @user``\n" +
									"❥ ``c!battlestats`` wurde hinzugefügt\n" +
									"❥ ``c!battleshop`` wurde hinzugefügt\n" +
									"❥ ``c!downgrade`` wurde hinzugefügt\n" +
									"❥ ``c!wintop`` wurde hinzugefügt\n" +
									"❥ ``c!losetop`` wurde hinzugefügt\n" +
									"❥ In den Toplisten wurden die Pfeile von > zu ➜ geändert\n" +
									"❥ Seelen, die man pro Minute pro Nachricht verdient wurden von *random zwischen 1 und 5* auf *random zwischen 1 und 10* erhöht\n" +
									"❥ Das Seelen-Transfersystem funktioniert nun mithilfe von Reaktionen, der Empfänger muss die Seelen nun auch annehmen wollen, damit der Transfer erfolgreich abläuft\n" +
									"❥ Der Cooldown für c!adventure wurde auf 6h runtergestellt\n" +
									"❥ 76/80 c!adventure Event-Belohnungen wurden um 100 Seelen erhöht\n" +
									"❥ die Rechtschreibung und Grammatik bei einigen c!adventure Events wurde verschönert und angepasst\n")
		const changelogmesb = new Discord.RichEmbed()
		.setTitle("**Changelog V1.5**")
		.setColor("0xFF0000")
		.setDescription("*Cerbot V1.5 [30.11.2019]*")
		.addField("**Neuerungen**", "❥ Es wurden ein paar Rechtschreibfehler korrigiert\n" +
									"❥ Ein neues Steckbrief System wurde eingeführt\n" +
									"❥ Man kann den Steckbrief von anderen Usern jetzt mit ``c!userinfo @user`` aufrufen\n" +
									"❥ Mit ``c!setrealname``, ``c!setnickname``, ``c!setbd``, ``c!setfavcol``, ``c!setgender``, ``c!setsize``, ``c!sethobbys``, ``c!setdesc`` kann man seinen Steckbrief anpassen\n" +
									"❥ Es gibt seit dem letzten kleinen Patch mittlerweile 100 ``c!adventure``-Events\n" +
									"❥ Ein Levelsystem wurde eingeführt, welches in Zukunft noch mehr Funktionen erhalten wird (aktuell erhöht einem das Level die Anzahl der Seelen, die man pro Nachricht pro Minute erhalten kann)\n" +
									"❥ Mit ``c!level`` kannst du dir dein Level anzeigen lassen\n" +
									"❥ Mit ``c!leveltop`` kannst du dir die Serverweite Höllenlevel-Rangliste ansehen\n" +
									"❥ Manche Befehle können ab jetzt unter mehreren Namen aufgerufen werden. Wenn du kürzere Varianten für einen Befehl suchst, dann gibt einfach mal ``c!alias [befehl]`` ein.\n")
		receivedMessage.author.send(changelogmesc)
		receivedMessage.author.send(changelogmesd)
		receivedMessage.author.send(changelogmese)
		receivedMessage.author.send(changelogmesb)
			.catch(() => receivedMessage.channel.send("Du hast Server DM's leider ausgeschalten!"));
		receivedMessage.channel.send("Der Changelog wurde dir per DM geschickt "+ receivedMessage.author +".")
	    console.log("changelog command executed")
	},
};