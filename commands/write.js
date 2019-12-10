const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');

module.exports = {
    name: 'write',
    description: 'Lässt den Bot in einem beliebigen Channel eine beliebige Nachricht schreiben',
    category: 'Admin',
    usage: '``c!write #channel [nachricht]``',
    execute(arguments, receivedMessage) {
        if (receivedMessage.author.id == "422716344228642828") {
            var ch = receivedMessage.mentions.channels.first()
            var text = receivedMessage.content.substr(9 + arguments[0].length)
            ch.send(text)
        }
    },
};