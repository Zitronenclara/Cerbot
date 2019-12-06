const fs = require('fs');
const Discord = require('discord.js');
var mysql = require('mysql');
const con = require('./../db.js');

module.exports = {
	name: 'buy',
	description: 'Damit kannst du Rollen und andere Items gegen Seelen eintauschen.',
	category: 'Währung',
    usage: '``c!buy [itemname/itemnummer]``',
	execute(arguments, receivedMessage) {
		if (arguments == "1") {
			const it = require('./shopitems/charon.js');
			it.buycharon(receivedMessage);
		} else if (arguments == "2") {
			const it = require('./shopitems/dionysos.js');
			it.buydionysos(receivedMessage);
		} else if (arguments == "3") {
			const it = require('./shopitems/artemis.js');
			it.buyartemis(receivedMessage);
		} else if (arguments == "4") {
			const it = require('./shopitems/eris.js');
			it.buyeris(receivedMessage);
		} else if (arguments == "5") {
			const it = require('./shopitems/erebos.js');
			it.buyerebos(receivedMessage);
		} else if (arguments == "6") {
			const it = require('./shopitems/nyx.js');
			it.buynyx(receivedMessage);
		} else if (arguments == "7") {
			const it = require('./shopitems/hephaistos.js');
			it.buyhephaistos(receivedMessage);
		} else if (arguments == "8") {
			const it = require('./shopitems/ares.js');
			it.buyares(receivedMessage);
		} else if (arguments == "9") {
			const it = require('./shopitems/thanatos.js');
			it.buythanatos(receivedMessage);
		} else if (arguments == "10") {
			const it = require('./shopitems/hades.js');
			it.buyhades(receivedMessage);
		} else if (arguments == "calcium" || arguments == "Calcium") {
			const it = require('./shopitems/calcium.js');
			it.buycalcium(receivedMessage);
		} else if (arguments == "magnesium" || arguments == "Magnesium") {
			const it = require('./shopitems/magnesium.js');
			it.buymagnesium(receivedMessage);
		} else if (arguments == "caesium" || arguments == "Caesium") {
			const it = require('./shopitems/caesium.js');
			it.buycaesium(receivedMessage);
		} else if (arguments == "steroide" || arguments == "Steroide") {
			const it = require('./shopitems/steroide.js');
			it.buysteroide(receivedMessage);
		} else if (arguments == "spinat" || arguments == "Spinat") {
			const it = require('./shopitems/spinat.js');
			it.buyspinat(receivedMessage);
		} else if (arguments == "erdbeermilch" || arguments == "Erdbeermilch") {
			const it = require('./shopitems/erdbeermilch.js');
			it.buyerdbeermilch(receivedMessage);
		} else if (arguments == "uran" || arguments == "Uran") {
			const it = require('./shopitems/uran.js');
			it.buyuran(receivedMessage);
		} else if (arguments == "plutonium" || arguments == "Plutonium") {
			const it = require('./shopitems/plutonium.js');
			it.buyplutonium(receivedMessage);
		} else if (arguments == "vibranium" || arguments == "Vibranium") {
			const it = require('./shopitems/vibranium.js');
			it.buyvibranium(receivedMessage);
		}
	},
};