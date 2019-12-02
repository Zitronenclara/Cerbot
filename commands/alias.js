const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');
var synonym = require('./../synonyms.json')
const synonyms = JSON.parse(JSON.stringify(synonym))

module.exports = {
    name: 'alias',
    description: 'shows alias of an command',
    execute(arguments, receivedMessage) {
        var search = arguments[0];
        if (!search){
            receivedMessage.channel.send(receivedMessage.author+", du musst schon angeben, zu welchem Befehl du nach Synonymen/Aliasen schauen willst.")
            return
        }
        var synget = synonyms.syn.find(({
            get
        }) => get.includes("" + search+ ""))
    
        if (synget == undefined) {
            var synset = synonyms.syn.find(({
                set
            }) => set.includes("" + search+ ""))
            if (synset == undefined){
                receivedMessage.channel.send(receivedMessage.author+", der Befehl ``"+search+"`` hat keine Synonyme/Aliase oder existiert nicht. Stelle sicher, dass du den Befehl, nach dem du suchst, ohne ``c!`` eingegeben hast.")
                return
            }else{
                receivedMessage.channel.send(receivedMessage.author+", dieser Befehl kann unter: ``"+synset.get+"`` und ``"+synset.set+"`` aufgerufen werden.")
            }
        }else{
            receivedMessage.channel.send(receivedMessage.author+", dieser Befehl kann unter: ``"+synget.get+"`` und ``"+synget.set+"`` aufgerufen werden.")
        }
    },
}