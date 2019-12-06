const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');

module.exports = {
    name: 'battleshop',
    description: 'Schickt dir eine Liste aller Items des Kampf-Shops per DM',
    category: 'Kampfsystem',
    usage: '``c!battleshop``',
    execute(arguments, receivedMessage) {
        const shopmes = new Discord.RichEmbed()
            .setTitle("**Kampfshopnachricht**")
            .setColor("0xFF4500")
            .setDescription("*Hier siehst du alle Shop-Items. Mit c!buy [itemname], kannst du dir das Item kaufen c: Natürlich ohne die [] schreiben uwu*")
            .addField("**HP-Booster**", "**Calcium** - erhöht deine maximalen HP um **5** Punkte [``500❦``]\n" +
                                        "**Magnesium** - erhöht deine maximalen HP um **15** Punkte [``1400❦``]\n" +
                                        "**Caesium** - erhöht deine maximalen HP um **30** Punkte [``2700❦``]\n")
            .addField("**Angriffs-Booster**", "**Steroide** - erhöht deine Angriffspunkte um **1** Punkte [``300❦``]\n" +
                                              "**Spinat** - erhöht deine Angriffspunkte um **3** Punkte [``800❦``]\n" +
                                              "**Erdbeermilch** - erhöht deine Angriffspunkte um **5** Punkte [``1250❦``]\n")
            .addField("**Verteidigungs-Booster**", "**Uran** - erhöht deine Verteidigungspunkte um **1** Punkte [``500❦``]\n" +
                                                   "**Plutonium** - erhöht deine Verteidigungspunkte um **2** Punkte [``960❦``]\n" +
                                                   "**Vibranium** - erhöht deine Verteidigungspunkte um **3** Punkte [``1350❦``]\n")
        receivedMessage.author.send(shopmes)
            .catch(() => receivedMessage.channel.send("Du hast Server DM's leider ausgeschalten!"));
        receivedMessage.channel.send(receivedMessage.author + ", dir wurde eine Liste aller Kampfshop-Items per DM geschickt.")
    },
};