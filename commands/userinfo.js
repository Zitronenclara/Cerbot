const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');

module.exports = {
	name: 'userinfo',
	description: 'shows profil of target',
	execute(arguments, receivedMessage) {
		if (!receivedMessage.mentions.users.size) {
            var target = receivedMessage.member
            var col = target.displayHexColor
		}else{
            var target = receivedMessage.mentions.members.first();
            var col = target.displayHexColor
        }
		con.query("SELECT * FROM userdata WHERE usrid = '"+target.id+"'", function (err, result, fields) {
	    	if (err) throw err;
	    	var udat = result
	        if (udat = undefined || udat.length == 0){
	        	var initid = ""+target.id+""
	        	receivedMessage.channel.send("Probiere es erneut.")
	        	const unt = require('./../bot.js');
				unt.dbinitus(target.id);
	        }else{
		con.query("SELECT * FROM userdata WHERE usrid = '"+target.id+"'", function (err, result, fields) {
        var realname = result[0].realname
        if (realname == null || !realname){
            realname = "*keine Angabe*"
        }
        var nickname = result[0].nickname
        if (nickname == null || !nickname){
            nickname = "*keine Angabe*"
        }
        var birthday = result[0].birthday
        if (birthday == null || !birthday){
            birthday = "*keine Angabe*"
        }
        var favcol = result[0].favcol
        if (favcol == null || !favcol){
            favcol = "*keine Angabe*"
        }
        var gender = result[0].gender
        if (gender == null || !gender){
            gender = "*keine Angabe*"
        }
        var size = result[0].size
        if (size == null || !size){
            size = "*keine Angabe*"
        }
        var hobbys = result[0].hobbys
        if (hobbys == null || !hobbys){
            hobbys = "*keine Angabe*"
        }
        var selfdesc = result[0].selfdesc
        if (selfdesc == null || !selfdesc){
            selfdesc = "*keine Angabe*"
        }
            if (err) throw err;
		const usrinfomes = new Discord.RichEmbed()
		.setTitle("**Steckbrief**")
		.setColor(col)
		.setDescription("Hier siehst du den Steckbrief von "+ target)
		.setThumbnail(target.user.avatarURL)
        .addField("**echter Name**", "**"+realname+"**")
        .addField("**Spitzname**", "**"+nickname+"**")
        .addField("**Geburtstag**", "**"+birthday+"**")
        .addField("**Lieblingsfarbe**", "**"+favcol+"**")
        .addField("**Geschlecht**", "**"+gender+"**")
        .addField("**Körpergröße**", "**"+size+"**")
        .addField("**Hobbys**", "**"+hobbys+"**")
        .addField("**Beschreibung**", "**"+selfdesc+"**")
		.setTimestamp()
		receivedMessage.channel.send(usrinfomes)
		});}
		});
	},
};