const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');

module.exports = {
    name: 'shipinfo',
    description: 'Zeigt dir Informationen über dein Raumschiff oder das eines anderen Users',
    category: 'Space',
    usage: '``c!shipinfo``, ``c!shipinfo @user``',
    execute(arguments, receivedMessage) {
        if (!receivedMessage.member.roles.find(r => r.name === "Commander")) {
            receivedMessage.reply("du hast noch kein Raumschiff, kaufe dir eins mit ``c!starthts`` c:")
            return
        }
        //setzt das Ziel zum erwähnten User oder zu einem selbst
        if (!receivedMessage.mentions.users.size) {
            var target = receivedMessage.member
        } else {
            var target = receivedMessage.mentions.members.first();
        }

        //testet zuerst ob das Ziel überhaupt ein Raumschiff hat
        var iscommander = 0;
        con.query("SELECT * FROM htsinv WHERE userid = '" + target.id + "'", function (err, result, fields) {
            if (err) throw err;
            var udat = result
            if (udat = undefined || udat.length == 0) {
                iscommander = 1
            } else {
                if (result[0].sizebewert == 0){
                    sizeb = "nicht eingebaut"
                }else{
                    sizeb = "verfügbar"
                }
                if (result[0].resbewert == 0){
                    resb = "nicht eingebaut"
                }else{
                    resb = "verfügbar"
                }
                if (result[0].atmbewert == 0){
                    atmb = "nicht eingebaut"
                }else{
                    atmb = "verfügbar"
                }
                if (result[0].waterbewert == 0){
                    watb = "nicht eingebaut"
                }else{
                    watb = "verfügbar"
                }
                if (result[0].tempbewert == 0){
                    tempb = "nicht eingebaut"
                }else{
                    tempb = "verfügbar"
                }
                if (result[0].magnetbewert == 0){
                    magb = "nicht eingebaut"
                }else{
                    magb = "verfügbar"
                }
                if (result[0].esirechner == 0){
                    esib = "nicht eingebaut"
                }else{
                    esib = "verfügbar"
                }
                if (result[0].habitbewert == 0){
                    habb = "nicht eingebaut"
                }else{
                    habb = "verfügbar"
                }
                const bodyembed = new Discord.RichEmbed()
                    .setTitle("**Raumschiffinfo**")
                    .setDescription("Hier siehst du Infos über das Raumschiff von " + target)
                    .setThumbnail(target.user.displayAvatarURL)
                    .addField("**Orbital-Analysegeräte**", "``Ressourcenscanner`` - Stufe: **" + result[0].ressclvl + "** - Effizienz: **" + (result[0].ressclvl * 10) + "%**\n" +
                        "``Beschleunigungssensor`` - Stufe: **" + result[0].gravsclvl + "** - Effizienz: **" + (result[0].gravsclvl * 10) + "%**\n" +
                        "``Atmosphärenanalysator`` - Stufe: **" + result[0].atmsclvl + "** - Effizienz: **" + (result[0].atmsclvl * 10) + "%**\n" +
                        "``Rotationsperiodograph`` - Stufe: **" + result[0].rotsclvl + "** - Effizienz: **" + (result[0].rotsclvl * 10) + "%**\n" +
                        "``Hydrospektrometer`` - Stufe: **" + result[0].watersclvl + "** - Effizienz: **" + (result[0].watersclvl * 10) + "%**\n" +
                        "``Infrarotsensor`` - Stufe: **" + result[0].tempsclvl + "** - Effizienz: **" + (result[0].tempsclvl * 10) + "%**\n" +
                        "``Protonenmagnetometer`` - Stufe: **" + result[0].magnetsclvl + "** - Effizienz: **" + (result[0].magnetsclvl * 10) + "%**\n" +
                        "``Anomaliendifferenzierer`` - Stufe: **" + result[0].anomalysclvl + "** - Effizienz: **" + (result[0].anomalysclvl * 10) + "%**\n")
                    .addField("**diverse KIs**", "``Größenbewerter`` - **"+sizeb+"**\n``Ressourcenbewerter`` - **"+resb+"**\n``Atmosphärenbewerter`` - **"+atmb+"**\n``Wasserbewerter`` - **"+watb+"**\n``Temperaturbewerter`` - **"+tempb+"**\n``Magnetfeldbewerter`` - **"+magb+"**\n``Erdähnlichkeitsrechner`` - **"+esib+"**\n``Bewohnbarkeitsanalysator`` - **"+habb+"**\n")
                receivedMessage.channel.send(bodyembed)
            }
            //schickt Error Nachricht
            if (iscommander == 1) {
                receivedMessage.channel.send(target + " hat noch kein Raumschiff.")
            }
        });
    },
};