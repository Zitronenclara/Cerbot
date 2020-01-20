const res = require('./resrates.json')
const preano = require('./commands/bodyanomalies/preanomaly.json')
const sufano = require('./commands/bodyanomalies/sufanomaly.json')
const anosolid = require('./commands/bodyanomalies/solidbodies.json')
const anoatmo = require('./commands/bodyanomalies/atmobodies.json')
const anogas = require('./commands/bodyanomalies/gasbodies.json')
const anostar = require('./commands/bodyanomalies/starbodies.json')

let randname = function () {
    var result = '';
    var length = Math.floor(Math.random() * 5) + 2
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersa = 'BCDFGHJKLMNPRSTVWYZ';
    var charactersb = 'AEIOU';
    var charactersc = '0123456789';
    var charactersLength = characters.length;
    var charactersaLength = charactersa.length;
    var charactersbLength = charactersb.length;
    var characterscLength = charactersc.length;

    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    result += "-"

    for (var i = 0; i < length; i++) {
        result += charactersa.charAt(Math.floor(Math.random() * charactersaLength));
        result += charactersb.charAt(Math.floor(Math.random() * charactersbLength));
    }
    result += "-"
    for (var i = 0; i < 6; i++) {
        result += charactersc.charAt(Math.floor(Math.random() * characterscLength));
    }
    return result;
}
exports.randname = randname

let randsize = function () {
    var type = Math.floor(Math.random() * 5) + 1
    var size;
    var art;
    var durch;
    var vergleich;
    //Astroid
    if (type == 1) {
        size = Math.floor(Math.random() * 653) + 52
        art = "Asteroid"
        durch = (size / 352.5).toFixed(2)
    }

    //Zwergplanet
    if (type == 2) {
        size = Math.floor(Math.random() * 3342) + 693
        art = "Zwergplanet"
        durch = (size / 2017.5).toFixed(2)
    }

    //Gesteinsplanet
    if (type == 3) {
        size = Math.floor(Math.random() * 20723) + 3343
        art = "Gesteinsplanet"
        durch = (size / 12033).toFixed(2)
    }

    //Gasriese
    if (type == 4) {
        size = Math.floor(Math.random() * 671743) + 31345
        art = "Gasriese"
        durch = (size / 351544).toFixed(2)
    }

    //Stern
    if (type == 5) {
        size = Math.floor(Math.random() * 1999865234) + 153174
        art = "Stern"
        durch = (size / 1000009204).toFixed(2)
    }
    if (durch <= 0.2) {
        vergleich = "winzig"
    } else if (durch > 0.2 && durch <= 0.4) {
        vergleich = "sehr klein"
    } else if (durch > 0.4 && durch <= 0.6) {
        vergleich = "klein"
    } else if (durch > 0.6 && durch <= 0.8) {
        vergleich = "unterdurchschnittlich"
    } else if (durch > 0.8 && durch <= 1.2) {
        vergleich = "durchschnittlich"
    } else if (durch > 1.2 && durch <= 1.4) {
        vergleich = "überdurchschnittlich"
    } else if (durch > 1.4 && durch <= 1.6) {
        vergleich = "groß"
    } else if (durch > 1.6 && durch <= 1.8) {
        vergleich = "sehr groß"
    } else if (durch > 1.8 && durch <= 2) {
        vergleich = "riesig"
    }
    
    //verhindert zu kleine Körper
    if (durch <= 0.3){
        durch = 0.5
    }

    return {
        "size": size,
        "type": type,
        "art": art,
        "compared": vergleich,
        "comparedrate": durch
    };
}
exports.randsize = randsize

let randres = function (amount, kons) {
    var aamount = ((amount / 4) * 3).toFixed(2)
    var bamount = (amount / 4).toFixed(2)
    //arbeitet mit 83^3
    var anumb = Math.floor(Math.random() * 571787) + 1
    var bnumb = Math.floor(Math.random() * 571787) + 1
    var ael = Math.round(Math.cbrt(anumb))
    var bel = Math.round(Math.cbrt(bnumb))

    //verhindert gleiche Elemente
    if (ael == bel && bel != 83) {
        ael = 83
    } else if (ael == bel && bel == 83) {
        bel = 82
    }

    //das Primärelement ist auch gleichzeitig das, das am häufigsten Vorkommt
    if (ael > bel) {
        aelement = ael
        belement = bel
    } else if (bel > ael) {
        aelement = bel
        belement = ael
    }

    var adata = res.el.find(({
        num
    }) => num == aelement)
    var bdata = res.el.find(({
        num
    }) => num == belement)

    //definiert die konsistenz der beiden Materialien
    var konsa;
    var konsb;
    if (kons == 1 || kons == 2){
        konsa = "fest"
        konsb = "fest"
    }
    if (kons == 3){
        konsa = "fest"
        konsb = "flüssig"
    }
    if (kons == 4){
        konsa = "gasförmig"
        konsb = "gasförmig"
    }
    if (kons == 5){
        konsa = "gasförmig"
        konsb = "plasma"
    }

    //definiert die seltenheit der beiden Materialien
    var rarafaktor = (adata.num / 83).toFixed(2)
    var rarbfaktor = (bdata.num / 83).toFixed(2)
    var rara;
    var rarb;
    if (rarafaktor <= 1 && rarafaktor > 0.9){
        rara = "extrem häufig"
    }else if(rarafaktor <= 0.9 && rarafaktor > 0.8){
        rara = "sehr häufig"
    }else if(rarafaktor <= 0.8 && rarafaktor > 0.7){
        rara = "häufig"
    }else if(rarafaktor <= 0.7 && rarafaktor > 0.6){
        rara = "oft"
    }else if(rarafaktor <= 0.6 && rarafaktor > 0.55){
        rara = "normal+"
    }else if(rarafaktor <= 0.55 && rarafaktor > 0.45){
        rara = "normal"
    }else if(rarafaktor <= 0.45 && rarafaktor > 0.4){
        rara = "normal-"
    }else if(rarafaktor <= 0.4 && rarafaktor > 0.3){
        rara = "weniger oft"
    }else if(rarafaktor <= 0.3 && rarafaktor > 0.2){
        rara = "selten"
    }else if(rarafaktor <= 0.2 && rarafaktor > 0.1){
        rara = "sehr selten"
    }else if(rarafaktor <= 0.1 && rarafaktor >= 0){
        rara = "extrem selten"
    }

    if (rarbfaktor <= 1 && rarbfaktor > 0.9){
        rarb = "extrem häufig"
    }else if(rarbfaktor <= 0.9 && rarbfaktor > 0.8){
        rarb = "sehr häufig"
    }else if(rarbfaktor <= 0.8 && rarbfaktor > 0.7){
        rarb = "häufig"
    }else if(rarbfaktor <= 0.7 && rarbfaktor > 0.6){
        rarb = "oft"
    }else if(rarbfaktor <= 0.6 && rarbfaktor > 0.55){
        rarb = "normal+"
    }else if(rarbfaktor <= 0.55 && rarbfaktor > 0.45){
        rarb = "normal"
    }else if(rarbfaktor <= 0.45 && rarbfaktor > 0.4){
        rarb = "normal-"
    }else if(rarbfaktor <= 0.4 && rarbfaktor > 0.3){
        rarb = "weniger oft"
    }else if(rarbfaktor <= 0.3 && rarbfaktor > 0.2){
        rarb = "selten"
    }else if(rarbfaktor <= 0.2 && rarbfaktor > 0.1){
        rarb = "sehr selten"
    }else if(rarbfaktor <= 0.1 && rarbfaktor >= 0){
        rarb = "extrem selten"
    }

    return [{
            "name": "" + adata.name + "",
            "short": "" + adata.short + "",
            "amount": aamount,
            "place": (83 - adata.num),
            "rarity": rara,
            "kons": konsa
        },
        {
            "name": "" + bdata.name + "",
            "short": "" + bdata.short + "",
            "amount": bamount,
            "place": (83 - bdata.num),
            "rarity": rarb,
            "kons": konsb
        }
    ]
}
exports.randres = randres

let wertcomputing = function (type, resaamount, resbamount, resaid, resbid, esi) {
    var typewert = type * 10
    var reswert = (((resaamount * typewert) * 10) * ((resaid + 1) ** 1.8) * typewert) + (((resbamount * typewert) * 10) * ((resbid + 1) ** 1.8) * typewert)

    //teurere Exoplaneten
    if (esi >= 65){
        reswert = reswert * (esi / 10)
    }

    var wert = Math.round(reswert)
    return wert;
}
exports.wertcomputing = wertcomputing

let randatmo = function (type) {
    var atmrate;
    var atmart;
    //Asteroiden, Gasriesen und Sterne haben keine Atmosphäre
    if (type == 1 || type == 4 || type == 5){
        atmrate = 0
    }else{
        atmorate = Math.floor(Math.random() * 300) + 1
        atmrate = (atmorate / 100).toFixed(2)
    }

    //legt Art der Atmosphäre fest
    if (atmrate >= 0 && atmrate <= 1){
        atmart = "keine"
    }else if(atmrate > 1 && atmrate <= 1.2){
        atmart = "fast keine"
    }else if(atmrate > 1.2 && atmrate <= 1.4){
        atmart = "extrem dünn"
    }else if(atmrate > 1.4 && atmrate <= 1.6){
        atmart = "sehr dünn"
    }else if(atmrate > 1.6 && atmrate <= 1.8){
        atmart = "dünn"
    }else if(atmrate > 1.8 && atmrate <= 1.9){
        atmart = "gut"
    }else if(atmrate > 1.9 && atmrate <= 2.1){
        atmart = "perfekt"
    }else if(atmrate > 2.1 && atmrate <= 2.2){
        atmart = "angenehm"
    }else if(atmrate > 2.2 && atmrate <= 2.4){
        atmart = "gut"
    }else if(atmrate > 2.4 && atmrate <= 2.6){
        atmart = "dicht"
    }else if(atmrate > 2.6 && atmrate <= 2.8){
        atmart = "sehr dicht"
    }else if(atmrate > 2.8 && atmrate <= 3){
        atmart = "extrem dicht"
    }
    
    return {"arate": atmrate, "aart": atmart};
}
exports.randatmo = randatmo

let randtemp = function (type, size, atmrate) {
    var temp;
    var tempart;
    var entfernung = Math.floor(Math.random() * 6) + 1

    //lässt Atmosphäre Einfluss auf Temperatur haben
    if (atmrate >= 2.7 && entfernung < 6){
        entfernung = 6
    }else if(atmrate >= 2.4 && atmrate < 2.7 && entfernung < 5){
        entfernung = 5
    }

    if (type == 5){
        rate = size / 7000000
        temp = rate * 5000
    }else{
        if (entfernung == 1){
            temp = -270
        }else if(entfernung == 2){
            rand = Math.floor(Math.random() * 70) + 200
            temp = rand * (-1)
        }else if(entfernung == 3){
            rand = Math.floor(Math.random() * 199) + 1
            temp = rand * (-1)
        }else if(entfernung == 4){
            rand = Math.floor(Math.random() * 60) + 1
            temp = rand
        }else if(entfernung == 5){
            rand = Math.floor(Math.random() * 40) + 60
            temp = rand
        }else if(entfernung == 6){
            rand = Math.floor(Math.random() * 400) + 100
            temp = rand
        }
    }
    
    if(temp >= -270 && temp <= -250){
        tempart = "nahe Nullpunkt"
    }else if(temp > -250 && temp <= -200){
        tempart = "extrem kalt"
    }else if(temp > -200 && temp <= -100){
        tempart = "sehr kalt"
    }else if(temp > -100 && temp <= -15){
        tempart = "kalt"
    }else if(temp > -15 && temp <= 0){
        tempart = "kühl"
    }else if(temp > 0 && temp <= 20){
        tempart = "angenehm"
    }else if(temp > 20 && temp <= 50){
        tempart = "warm"
    }else if(temp > 50 && temp <= 100){
        tempart = "heiß"
    }else if(temp > 100 && temp <= 200){
        tempart = "sehr heiß"
    }else if(temp > 200 && temp <= 300){
        tempart = "extrem heiß"
    }else if(temp > 300 && temp <= 500){
        tempart = "brennend heiß"
    }else if(temp > 500){
        tempart = "unvorstellbar heiß"
    }

    //macht Wasser und so
    var waterart;
    var nowater = Math.floor(Math.random() * 5) + 1
    var water = (Math.floor(Math.random() * 9799) + 1) / 100

    if (nowater == 1){
        water = 0
    }

    if(type == 1 || type == 4 || type == 5){
        water = 0
    }
    if (temp <= 0){
        waterart = "eis"
        water = (water / 2).toFixed(2)
    }else if(temp > 0 && temp < 100){
        waterart = "flüssig"
    }else if(temp >= 100){
        waterart = "gasförmig"
        water = (water / 10).toFixed(2)
    } 
    if(water == 0){
        waterart = "nicht vorhanden"
    }

    //fügt Kommazahlen hinzu
    var komma = (Math.floor(Math.random() * 99) + 1) / 100
    temp = temp + komma

    return {"temp": temp, "tempart": tempart, "water": water, "waterart": waterart};
}
exports.randtemp = randtemp

let gravitation = function (size) {
    var grav;
    grav = (size / 12000).toFixed(4)
    return grav;
}
exports.gravitation = gravitation

let esicalc = function (type, grav, temp, atm, water, waterart, magnet) {
    var esi;

    if (type == 4 || type == 5){
        esi = 0
    }else{
        gravindex = grav - 1
        if (gravindex < 0){
            gravindex = gravindex * (-1)
        }
        if (gravindex > 1){
            gravindex = 1 / gravindex
        }

        if (temp < 0){
            temp = temp * (-1)
            temp = temp + 20
        }
        tempindex = temp / 15
        if (tempindex > 1){
            tempindex = 1 / tempindex
        }

        atm = atm - 1
        if (atm < 0){
            atm = 0
        }
        atmindex = atm / 1
        if (atmindex > 1){
            atmindex = 1 / atmindex
        }

        waterartindex = 0
        if (waterart == "flüssig"){
            waterartindex = 1
        }else if(waterart == "eis"){
            waterartindex = 0.5
        }else if(waterart == "gasförmig"){
            waterartindex = 0.2
        }

        magnetindex = magnet / 1
        if (magnetindex > 1){
            magnetindex = 1 / magnetindex
        }

        esi = (((gravindex + tempindex + atmindex + waterartindex + magnetindex) / 5) * 100).toFixed(2)
    }

    return esi;
}
exports.esicalc = esicalc

let habitacalc = function (type, atmart, tempart, grav, waterart, magnet) {
    var habi = "";
    
    if (type == 4 || type == 5){
        habi = "Definitiv **unbewohnbar**."
    }else{
        //bewertet die Atmosphäre
        if (atmart == "keine"){
            habi += "Eine Wohnkuppel wird nötig sein, da es **keine Atmosphäre** gibt.\n"
        }else if(atmart == "fast keine"){
            habi += "Das Leben ohne Wohnkuppel ist unmöglich, weil die **Atmosphäre hauchdünn** ist.\n"
        }else if(atmart == "extrem dünn"){
            habi += "Die **Atmosphäre ist so dünn**, dass das Leben ohne geeignete Wohnkuppel unmöglich ist.\n"
        }else if(atmart == "sehr dünn"){
            habi += "In niedrigeren Höhenlagen ist das Atmen möglich, aber begrenzt.\n"
        }else if(atmart == "dünn"){
            habi += "Das **Atmen ist mit geringer Atemhilfe** in hohen Höhenlagen möglich.\n"
        }else if(atmart == "gut"){
            habi += "Das **Atmen ist fast uneingeschränkt** möglich.\n"
        }else if(atmart == "perfekt"){
            habi += "Diese Luft ist perfekt zum Atmen, **fast so gut wie auf der Erde**.\n"
        }else if(atmart == "angenehm"){
            habi += "Die Atemluft **ähnelt sehr der Luft auf der Erde**.\n"
        }else if(atmart == "dicht"){
            habi += "Man kann zwar atmen, wegen des **erhöhten Luftdrucks** ist es aber etwas anstrengender als auf der Erde.\n"
        }else if(atmart == "sehr dicht"){
            habi += "Durch den **hohen Luftdruck** ist es unmöglich zu Atmen.\n"
        }else if(atmart == "extrem dicht"){
            habi += "Ohne **druckdichtem Anzug** würde man hier sofort implodieren.\n"
        }

        //bewertet die Temperatur
        if (tempart == "nahe Nullpunkt"){
            habi += "Diese **Kälte ist so extrem**, hier zu laufen ist, als würde man einfach im All herumschweben.\n"
        }else if(tempart == "extrem kalt"){
            habi += "Ohne **extremen Kälteschutz** kann man hier nicht überleben.\n"
        }else if(tempart == "sehr kalt"){
            habi += "Ohne **angemessenem Kälteschutz** kann man hier nicht überleben.\n"
        }else if(tempart == "kalt"){
            habi += "Hier ist es so **kalt, wie in kalten Regionen der Erde**, mit Skiausrüstung kannst du hier bedenkenlos leben.\n"
        }else if(tempart == "kühl"){
            habi += "Die Kälte ist für einen Menschen **mit Wintersachen ertragbar**.\n"
        }else if(tempart == "angenehm"){
            habi += "Die Temperaturen sind **sehr erträglich**, fast so wie auf der Erde.\n"
        }else if(tempart == "warm"){
            habi += "Hier ist es **so warm, wie in den wärmeren Regionen der Erde**. Sonnencreme nicht vergessen.\n"
        }else if(tempart == "heiß"){
            habi += "Dein Blut **würde anfangen zu kochen** wenn du hier ungeschützt herumläufst.\n"
        }else if(tempart == "sehr heiß"){
            habi += "Du brauchst **sehr gute Wärmeschutzausrüstung** um hier zu überleben.\n"
        }else if(tempart == "extrem heiß"){
            habi += "Du brauchst **extrem gute Wärmeschutzausrüstung** um hier zu überleben.\n"
        }else if(tempart == "brennend heiß"){
            habi += "Hier zu Leben **ohne zu schmelzen ist extrem aufwendig**.\n"
        }

        //bewertet die Gravitation
        if (grav >= 0 && grav <= 0.2){
            habi += "Hier auf dauer ohne künstliche Gravitation zu leben, würde **starken Muskelschwund** hervorrufen. \n"
        }else if(grav > 0.2 && grav <= 0.4){
            habi += "Hier ist die **Gravitation zwar größer als auf unserem Erdmond**, aber noch lange nicht perfekt. \n"
        }else if(grav > 0.4 && grav <= 0.6){
            habi += "Mit ausreichendem Training kann man hier **fast ohne negative Auswirkungen auf die Muskeln leben**. \n"
        }else if(grav > 0.6 && grav <= 0.8){
            habi += "Mit regelmäßigem Training lebt man hier ein **gesundes Leben ohne negative Auswirkungen auf die Muskeln**. \n"
        }else if(grav > 0.8 && grav <= 1.2){
            habi += "Die **Gravitation ist nahezu erdähnlich**. Hier zu laufen fühlt sich so unglaublich heimisch an. \n"
        }else if(grav > 1.2 && grav <= 1.4){
            habi += "Die **Gravitation ist etwas höher als auf der Erde** somit kosten dich selbst einfache Arbeiten mehr Energie. \n"
        }else if(grav > 1.4 && grav <= 1.6){
            habi += "Beim Arbeiten musst du aufgrund der **erhöhten Gravitation** viel Energie aufwenden. \n"
        }else if(grav > 1.6 && grav <= 1.8){
            habi += "Die Gravitationskraft ist **ungesund hoch**. \n"
        }else if(grav > 1.8){
            habi += "Die **Gravitation ist zu hoch**, um ein gesundes Leben führen zu können. \n"
        }

        //bewertet das Wasser
        if (waterart == "flüssig"){
            habi += "**Flüssiges Wasser** sorgt für eine perfekte Lebensgrundlage. \n"
        }else if(waterart == "eis"){
            habi += "Lebensnotwendiges Wasser müssten wir aus **Eis** gewinnen. \n"
        }else if(waterart == "gasförmig" && atmart != "keine"){
            habi += "Lebensnotwendiges Wasser müssten wir **mit hohem aufwand aus der Atmosphäre** gewinnen. \n"
        }else if(waterart == "gasförmig" && atmart == "keine"){
            habi += "Lebensnotwendiges Wasser müssten wir **mit hohem aufwand aus Wasserdampf** gewinnen, dass wegen der fehlenden Atmosphäre allerdings schnell verschwindet. \n"
        }else if(waterart == "nicht vorhanden"){
            habi += "Hier gibt es **kein Wasser**, was ein unabhängiges Leben komplett unmöglich macht. \n"
        }

        //bewertet das Magnetfeld
        if (magnet == "keins"){
            habi += "Da **kein Magnetfeld** vorhanden ist, ist man hier der kosmischen Strahlung schutzlos ausgeliefert."
        }else if(magnet == "kaum bemerkbar"){
            habi += "Das **unvorstellbar schwache Magnetfeld** hält keine kosmische Strahlung ab."
        }else if(magnet == "extrem schwach"){
            habi += "Das Magnetfeld ist **zu schwach** um kosmische Strahlung abzuhalten."
        }else if(magnet == "sehr schwach"){
            habi += "Das Magnetfeld ist gerade stark genug um einen **kleinen Bruchteil der kosmischen Strahlung abzuhalten**."
        }else if(magnet == "schwach"){
            habi += "Das Magnetfeld **schützt vor wenigen gefährlichen Strahlungsarten** des Alls."
        }else if(magnet == "gut"){
            habi += "Das **akzeptable Magnetfeld** wehrt einige gefährliche Strahlungstypen ab."
        }else if(magnet == "perfekt"){
            habi += "Das Magnetfeld **wehrt die meiste kosmische Strahlung ab** und schützt uns vor vielen Krankheiten. Es ist fast genauso stark wie auf der Erde."
        }else if(magnet == "stark"){
            habi += "Das Magnetfeld ist **ziemlich stark** und könnte mögliche Mutagene abwehren, was dazu führt, dass die Evolutionsgeschwindigkeit abnimmt."
        }else if(magnet == "sehr stark"){
            habi += "Das Magnetfeld ist **zu stark** und kann die Gesundheit negativ beeinflussen."
        }
    }
    return habi;
}
exports.habitacalc = habitacalc

let magneticfield = function (size) {
    var magnet;
    var magnetart;
    var faktor = size / 12000
    var nomagnet = Math.floor(Math.random() * 5) + 1
    var faktorfaktor = Math.floor(Math.random() * 500) + 1
    
    //jeder 5. Körper hat kein Magnetfeld
    if (nomagnet == 1){
        faktorfaktor = 0
    }
    
    faktorfaktor = faktorfaktor / 100
    magnet = (faktor * faktorfaktor).toFixed(2)

    //bewertet das Magnetfeld
    if (magnet == 0){
        magnetart = "keins"
    }else if(magnet > 0 && magnet <= 0.2){
        magnetart = "kaum bemerkbar"
    }else if(magnet > 0.2 && magnet <= 0.4){
        magnetart = "extrem schwach"
    }else if(magnet > 0.4 && magnet <= 0.6){
        magnetart = "sehr schwach"
    }else if(magnet > 0.6 && magnet <= 0.7){
        magnetart = "schwach"
    }else if(magnet > 0.7 && magnet <= 0.9){
        magnetart = "gut"
    }else if(magnet > 0.9 && magnet <= 1.1){
        magnetart = "perfekt"
    }else if(magnet > 1.1 && magnet <= 1.3){
        magnetart = "gut"
    }else if(magnet > 1.3 && magnet <= 5){
        magnetart = "stark"
    }else if(magnet > 5 && magnet <= 25){
        magnetart = "sehr stark"
    }else if(magnet > 25 && magnet <= 100){
        magnetart = "extrem stark"
    }else if(magnet > 100 && magnet <= 250){
        magnetart = "lebensgefährlich stark"
    }else if(magnet > 250 && magnet <= 1000){
        magnetart = "mehr als lebensgefährlich stark"
    }else if(magnet > 1000){
        magnetart = "unvorstellbar heftig"
    }

    return {"magnet": magnet, "magnetart": magnetart};
}
exports.magneticfield = magneticfield

let rottime = function (type, size) {
    var hourstext = ""
    var geschwrandom = Math.floor(Math.random() * 50) + 1
    var geschw = geschwrandom ** type
    var hours = (size / geschw).toFixed(2)
    var multiply = Math.floor(Math.random() * 10) + 1

    if (type == 3){
        hours = (hours * multiply).toFixed(2)
    }else if(type == 4){
        hours = (hours / (multiply * 2)).toFixed(2)
    }else if(type == 5){
        hours = (hours / (multiply * 3)).toFixed(2)
    }

    if (hours < 1){
        minuten = (hours * 60).toFixed(2)
        sekunden = Math.round((minuten - Math.floor(minuten)) * 60)
        hourstext = "``"+Math.round(minuten)+"`` **min**"
        if (sekunden != 0){
            hourstext += " und ``"+sekunden+"`` **sek**"
        }
    }else if(hours >= 1 && hours <= 24){
        stunden = hours
        minuten = Math.round((hours - Math.floor(hours)) * 60)
        hourstext = "``"+Math.round(hours)+"`` **std**"
        if (minuten != 0){
            hourstext += " und ``"+minuten+"`` **min**"
        }
    }else if(hours > 24 && hours <= 8760){
        tage = (hours / 24).toFixed(2)
        stunden = Math.round((tage - Math.floor(tage)) * 24)
        hourstext = "``"+Math.round(tage)+"`` **t**"
        if (stunden != 0){
            hourstext += " und ``"+stunden+"`` **std**"
        }
    }else if (hours > 8760){
        jahre = (hours / 8760).toFixed(2)
        tage = Math.round((jahre - Math.floor(jahre)) * 365)
        hourstext = "``"+Math.round(jahre)+"`` **j**"
        if (jahre != 0){
            hourstext += " und ``"+tage+"`` **t**"
        }
    }

    return {"hours": hours, "hourstext": hourstext};
}
exports.rottime = rottime

let anomaly = function (type, comp, atm) {
    var ano;
    var anowert = 0;
    var noano = Math.floor(Math.random() * 10) + 1

    if (noano <= 7){
        ano = "keine Anomalien"
    }else{
        var prenum = (Math.floor(Math.random() * (preano.pre.length)) + 1) - 1
        var sufnum = (Math.floor(Math.random() * (sufano.suf.length)) + 1) - 1

        if (type == 1 && atm <= 1.2 || type == 2 && atm <= 1.2 || type == 3 && atm <= 1.2){
            var midnum = (Math.floor(Math.random() * (anosolid.mid.length)) + 1) - 1
            var ano = preano.pre[prenum].name+" "+anosolid.mid[midnum].name+""+sufano.suf[sufnum].name


        }else if(type == 1 && atm > 1.2 || type == 2 && atm > 1.2 || type == 3 && atm > 1.2){
            var midnum = (Math.floor(Math.random() * (anoatmo.mid.length)) + 1) - 1
            var ano = preano.pre[prenum].name+" "+anoatmo.mid[midnum].name+""+sufano.suf[sufnum].name


        }else if(type == 4){
            var midnum = (Math.floor(Math.random() * (anogas.mid.length)) + 1) - 1
            var ano = preano.pre[prenum].name+" "+anogas.mid[midnum].name+""+sufano.suf[sufnum].name

            
        }else if(type == 5){
            var midnum = (Math.floor(Math.random() * (anostar.mid.length)) + 1) - 1
            var ano = preano.pre[prenum].name+" "+anostar.mid[midnum].name+""+sufano.suf[sufnum].name


        }
    }

    //berechnet Wert der Anomalie
    var anorandom = Math.floor(Math.random() * 2500) + 1
    var anorandoma = Math.round(Math.sqrt(anorandom)) - 49

    if (anorandoma < 0){
        anorandoma = anorandoma * (- 1)
    }

    var anowert = anorandoma * 10
    if (ano == "keine Anomalien"){
        anowert = 0
    }

    return {"name": ano, "wert": anowert};
}
exports.anomaly = anomaly