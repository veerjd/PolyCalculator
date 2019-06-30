require('dotenv').config();
const { Client, RichEmbed } = require('discord.js');
const bot = new Client();
const http = require("http");

const express = require('express');
var app = express();

class Fight {
    constructor(aname, ahp, amaxhp, aattack, dname, dhp, dmaxhp, ddef, dbonus) {
        console.log(aname,"/",dname)
        this.aname = aname
        this.ahp = ahp;
        this.amaxhp = amaxhp;
        this.aattack = aattack;
        this.dname = dname;
        this.dhp = dhp;
        this.dmaxhp = dmaxhp;
        this.ddef = ddef;
        this.dbonus = dbonus;
        this.aforce = this.aattack*this.ahp/this.amaxhp;
        this.dforce = this.ddef*this.dhp/this.dmaxhp*this.dbonus;
    }
  
    calculate() {
        var totaldam = this.aforce+this.dforce;
        var hpdefender = this.dhp - Math.round(this.aforce / totaldam * this.aattack * 4.5);
        if(hpdefender <= 0) {
            hpattacker = this.ahp;
            hpdefender = 'DESTROYED'
        }
        else {
            var hpattacker = this.ahp - Math.round(this.dforce / totaldam * this.ddef * 4.5);
        }

        if(hpattacker <= 0)
            hpattacker = 'DESTROYED';

        const helpEmbed = new RichEmbed()
            .setColor('#FA8072')
            .addField(`**${this.aname}**:`, hpattacker)
            .addField(`**${this.dname}**:`, hpdefender)
        return helpEmbed;
    }
}

const warrior = {
    name: "Warrior",
    maxhp: 10,
    vethp: 15,
    att: 2,
    def: 2
}

const rider = {
    name: "Rider",
    maxhp: 10,
    vethp: 15,
    att: 2,
    def: 1
}

const archer = {
    name: "Archer",
    maxhp: 10,
    vethp: 15,
    att: 2,
    def: 1
}

const defender = {
    name: "Defender",
    maxhp: 15,
    vethp: 20,
    att: 1,
    def: 3
}

const knight = {
    name: "Knight",
    maxhp: 15,
    vethp: 20,
    att: 3.5,
    def: 1
}

const swords = {
    name: "Swordsman",
    maxhp: 15,
    vethp: 20,
    att: 3,
    def: 3
}

const catapult = {
    name: "Catapult",
    maxhp: 10,
    vethp: 15,
    att: 4,
    def: 0
}

const giant = {
    name: "Giant",
    maxhp: 40,
    vethp: 40,
    att: 5,
    def: 4
}

const crab = {
    name: "Crab",
    maxhp: 40,
    vethp: 40,
    att: 4,
    def: 4
}

const tridention = {
    name: "Tridention",
    maxhp: 15,
    vethp: 20,
    att: 3,
    def: 1
}

const polytaur = {
    name: "Polytaur",
    maxhp: 15,
    vethp: 20,
    att: 3,
    def: 1
}

const navalon = {
    name: "Navalon",
    maxhp: 30,
    vethp: 30,
    att: 4,
    def: 4
}

const boat = {
    name: "Boat",
    maxhp: undefined,
    vethp: undefined,
    att: 1,
    def: 1
}

const ship = {
    name: "Ship",
    maxhp: undefined,
    vethp: undefined,
    att: 2,
    def: 2
}

const battleship = {
    name: "Battleship",
    maxhp: undefined,
    vethp: undefined,
    att: 4,
    def: 3
}

const gaami = {
    name: "Gaami",
    maxhp: 30,
    vethp: 30,
    att: 4,
    def: 4
}

const mindbender = {
    name: "Mind Bender",
    maxhp: 10,
    vethp: 10,
    att: 0,
    def: 1
}

const babydragon = {
    name: "Baby Dragon",
    maxhp: 15,
    vethp: 20,
    att: 3,
    def: 3
}

const firedragon = {
    name: "Fire Dragon",
    maxhp: 20,
    vethp: 20,
    att: 4,
    def: 3
}

const mooni = {
    name: "Mooni",
    maxhp: 10,
    vethp: 10,
    att: 0,
    def: 2
}

const battlesled = {
    name: "Battle Sled",
    maxhp: 15,
    vethp: 20,
    att: 3,
    def: 2
}

const icefortress = {
    name: "Ice Fortress",
    maxhp: 20,
    vethp: 25,
    att: 4,
    def: 3
}

const allUnits = new Map()
allUnits.set("wa", warrior)
allUnits.set("ri", rider)
allUnits.set("ar", archer)
allUnits.set("de", defender)
allUnits.set("kn", knight)
allUnits.set("sw", swords)
allUnits.set("gi", giant)
allUnits.set("ga", gaami)
allUnits.set("ca", catapult)
allUnits.set("tr", tridention)
allUnits.set("po", polytaur)
allUnits.set("na", navalon)
allUnits.set("cr", crab)
allUnits.set("mb", mindbender)
allUnits.set("bd", babydragon)
allUnits.set("fd", firedragon)
allUnits.set("mo", mooni)
allUnits.set("sl", battlesled)
allUnits.set("if", icefortress)

function getUnit(array) {
    const warrior = {
        name: "Warrior",
        maxhp: 10,
        vethp: 15,
        att: 2,
        def: 2
    }
    
    const rider = {
        name: "Rider",
        maxhp: 10,
        vethp: 15,
        att: 2,
        def: 1
    }
    
    const archer = {
        name: "Archer",
        maxhp: 10,
        vethp: 15,
        att: 2,
        def: 1
    }
    
    const defender = {
        name: "Defender",
        maxhp: 15,
        vethp: 20,
        att: 1,
        def: 3
    }
    
    const knight = {
        name: "Knight",
        maxhp: 15,
        vethp: 20,
        att: 3.5,
        def: 1
    }
    
    const swords = {
        name: "Swordsman",
        maxhp: 15,
        vethp: 20,
        att: 3,
        def: 3
    }
    
    const catapult = {
        name: "Catapult",
        maxhp: 10,
        vethp: 15,
        att: 4,
        def: 0
    }
    
    const giant = {
        name: "Giant",
        maxhp: 40,
        vethp: 40,
        att: 5,
        def: 4
    }
    
    const crab = {
        name: "Crab",
        maxhp: 40,
        vethp: 40,
        att: 4,
        def: 4
    }
    
    const tridention = {
        name: "Tridention",
        maxhp: 15,
        vethp: 20,
        att: 3,
        def: 1
    }
    
    const polytaur = {
        name: "Polytaur",
        maxhp: 15,
        vethp: 20,
        att: 3,
        def: 1
    }
    
    const navalon = {
        name: "Navalon",
        maxhp: 30,
        vethp: 30,
        att: 4,
        def: 4
    }
    
    const boat = {
        name: "Boat",
        maxhp: undefined,
        vethp: undefined,
        att: 1,
        def: 1
    }
    
    const ship = {
        name: "Ship",
        maxhp: undefined,
        vethp: undefined,
        att: 2,
        def: 2
    }
    
    const battleship = {
        name: "Battleship",
        maxhp: undefined,
        vethp: undefined,
        att: 4,
        def: 3
    }
    
    const gaami = {
        name: "Gaami",
        maxhp: 30,
        vethp: 30,
        att: 4,
        def: 4
    }
    
    const mindbender = {
        name: "Mind Bender",
        maxhp: 10,
        vethp: 10,
        att: 0,
        def: 1
    }
    
    const babydragon = {
        name: "Baby Dragon",
        maxhp: 15,
        vethp: 20,
        att: 3,
        def: 3
    }
    
    const firedragon = {
        name: "Fire Dragon",
        maxhp: 20,
        vethp: 20,
        att: 4,
        def: 3
    }
    
    const mooni = {
        name: "Mooni",
        maxhp: 10,
        vethp: 10,
        att: 0,
        def: 2
    }
    
    const battlesled = {
        name: "Battle Sled",
        maxhp: 15,
        vethp: 20,
        att: 3,
        def: 2
    }
    
    const icefortress = {
        name: "Ice Fortress",
        maxhp: 20,
        vethp: 25,
        att: 4,
        def: 3
    }
    const allUnits = new Map()
    allUnits.set("wa", warrior)
    allUnits.set("ri", rider)
    allUnits.set("ar", archer)
    allUnits.set("de", defender)
    allUnits.set("kn", knight)
    allUnits.set("sw", swords)
    allUnits.set("gi", giant)
    allUnits.set("ga", gaami)
    allUnits.set("ca", catapult)
    allUnits.set("tr", tridention)
    allUnits.set("po", polytaur)
    allUnits.set("na", navalon)
    allUnits.set("cr", crab)
    allUnits.set("mb", mindbender)
    allUnits.set("bd", babydragon)
    allUnits.set("fd", firedragon)
    allUnits.set("mo", mooni)
    allUnits.set("sl", battlesled)
    allUnits.set("if", icefortress)

    unitKeys = Array.from(allUnits.keys());
    let unitKey = array.filter(value => unitKeys.includes(value.substring(0,2)))
    unitKey = unitKey.toString().substring(0,2)
    unit = allUnits.get(unitKey)

    if(array.some(x => x.startsWith("bo"))) {
        unit.name = unit.name + " Boat";
        unit.att = 1;
        unit.def = 1;
    } else if(array.some(x => x.startsWith("sh"))) {
        unit.name = unit.name + " Ship";
        unit.att = 2;
        unit.def = 2;
    } else if(array.some(x => (x.startsWith("ba") || x.startsWith("bs")))) {
        unit.name = unit.name + " Battleship";
        unit.att = 4;
        unit.def = 3;
    }

    if(unit) {
        return unit
    } else   
        return undefined
}

function getMaxHP(array, unit) {
    if(array.some(x => x.startsWith('v'))) {
        return unit.vethp;
    } else {
        return unit.maxhp;
    }
}

function getCurrentHP(array, maxhp) {
    if(array.some(x => !isNaN(Number(x)))) {
        index = array.findIndex(x => !isNaN(Number(x)))
        return parseInt(array[index])
    } else {
        return maxhp
    }   
}

function getBonus(array, unit) {
    if(array.some(x => x === 'w')) {
        unit.name = unit.name + " (walled)"
        return 4;
    } else if(array.some(x => x === 'd')) {
        unit.name = unit.name + " (protected)"
        return 1.5;
    } else {
        return 1;
    }
}

bot.on('ready', () => {
    const prefix = process.env.PREFIX;
    console.log(`Logged in as ${bot.user.username}`);
    bot.user.setActivity(`prefix: ${prefix}`, { type: 'LISTENING' });
});

//--------------------------------------
//
//          EVENT ON MESSAGE
//
//--------------------------------------
bot.on('message', message => {
    prefix = process.env.PREFIX;

    if(message.author.bot || !message.content.startsWith(prefix))
        return;
    else if (message.channel.name.startsWith("general") || message.channel.name.startsWith("crawnv")) {
        message.channel.send('Come on! Not in **#general** or **#crawnversation**');
        return
    }
    
    let cmd = message.content.toLowerCase().slice(prefix.length).split(/ +/, 1).toString();
    console.log("Command triggered:", cmd, `in ${message.guild} in ${message.channel}`);
    let args;
//--------------------------------------------------
//
//                 !HELP COMMAND
//
//--------------------------------------------------
    if (cmd === "help") {
        args = message.content.toLowerCase().slice(prefix.length+cmd.length+1).split(/ +/);
        const helpEmbed = new RichEmbed()
            .setColor('#FA8072')
        if (args[0] === "full") {
            helpEmbed.setTitle("How to use the `!full` command")
                .addField("Argument structure:", `!full attackerCurrentHP attackerMaxHP attack defenderCurrentHP defenderMaxHP defense (defense/wall)`)
                .addField("Long example:", `!full 10 10 2 10 10 2`)
        } else if (args[0] === "name") {
            helpEmbed.setTitle("How to use the `!name` command")
                .setDescription("Parentheses are optional arguments. Units require 2 characters.")
                .addField("Argument structure:", `!name (attackerCurrentHP) attackerByName (vet), (defenderCurrentHP) unitByName (vet) (d/w)`)
                .addField("Long example:", `!name 10 warrior vet, 8 rider`)
                .addField("Short example:", `!name wa, de`)
                .addField("**Last argument details:**", `It's the defense bonus. Not putting anything would consider it without a defense bonus. \`d\` = defense = x1.5 bonus; \`w\` = wall = x4 bonus.`)
                .addField("**Example:**", "!name 10 warrior vet, 8 rider w")
        } else {
            helpEmbed.setTitle("How to use the PolyCalculator bot")
                .setDescription("Parentheses are optional arguments. Units require 2 characters.")
                .addField("**!name** command:", `!name (attackerCurrentHP) attackerByName (vet), (defenderCurrentHP) unitByName (vet) (d/w)`)
                .addField("**!name** example:", `!name 10 warrior vet, 8 rider`)
                .addField("**!full** command:", `!full attackerCurrentHP attackerMaxHP attack defenderCurrentHP defenderMaxHP defense (defense/wall)`)
                .addField("**!full** example:", `!full 10 10 2 10 10 2`)
                .addField("**Last argument details:**", `It's the defense bonus. Not putting anything would consider it without a defense bonus. d = defense = x1.5 bonus; w = wall = x4 bonus.`)
                .addField("**Example:**", "!name 10 wa vet, 8 ri w")
                .addBlankField()
                .addField("**More details:**", "`!help full` or `!help name`")
        }
        message.channel.send(helpEmbed);
//--------------------------------------------------
//
//                 !UNITS COMMAND
//
//--------------------------------------------------
    } else if (cmd.startsWith("unit") || cmd.startsWith("code")) {
        unitEmbed = new RichEmbed();
        unitEmbed.setColor('#FA8072')
            .setTitle("All units by code")
        units = [];
        allUnits.forEach((val, key) => {
            units.push(`${val.name}: ${key}`)
        })
        unitEmbed.setDescription(units);
        message.channel.send(unitEmbed);
//--------------------------------------------------
//
//                !FULL COMMAND
//
//--------------------------------------------------
    } else if (cmd === "full") {
        args = message.content.toLowerCase().slice(prefix.length).split(/ +/);
        args.shift();
        if(args[0] === undefined || Number(args[0]) > 40 || Number(args[0]) < 1 || Number(args[1]) > 40 || Number(args[1]) < 1 || Number(args[0]) > Number(args[1]) || Number(args[2]) < 0 || Number(args[2]) > 5 || Number(args[3]) > 40 || Number(args[3]) < 1 || Number(args[4]) > 40 || Number(args[4]) < 1 || Number(args[3]) > Number(args[4]) || Number(args[5]) < 0 || Number(args[5]) > 5)
            return message.channel.send(`ERROR: There is a problem with your format, try \`${prefix}help\``)
        let bonus = 1;
        if(args[6] === 'd')
            bonus = 1.5;
        if(args[6] === 'w')
            bonus = 4;
        const result = new Fight("Attacker", Number(args[0]),Number(args[1]),Number(args[2]),"Defender",Number(args[3]),Number(args[4]),Number(args[5]),bonus)
        message.channel.send(result.calculate());
//--------------------------------------------------
//
//                !NAME COMMAND
//
//--------------------------------------------------
    } else if (cmd === "name" || cmd === 'n') {
//--------------------------------------------------
//          HANDLER TO CLEAN THE CMD ARRAY
//--------------------------------------------------
        args = message.content.toLowerCase().slice(prefix.length);

        if(args.includes("-"))
            units = args.split("-")
        else if(args.includes("/"))
            units = args.split("/")
        else if(args.includes(","))
            units = args.split(",")
        else
            return message.channel.send("You need to separate the attacker from the defender using a `-`, a `,` or a `/` ");

        preAttacker = units[0].split(/ +/);
        preAttacker.shift()
        preAttacker = preAttacker.filter(x => x != "");
        preDefender = units[1].split(/ +/);
        preDefender = preDefender.filter(x => x != "");

//--------------------------------------------------
//        GET FUNCTIONS TO FIND UNITS STATS
//--------------------------------------------------
        attackerUnit = {
            name: undefined,
            currentHP: undefined,
            maxHP: undefined,
            att: undefined
        }
        defenderUnit = {
            name: undefined,
            currentHP: undefined,
            maxHP: undefined,
            def: undefined,
            bonus: undefined
        }

        attackerStats = getUnit(preAttacker)
        if(attackerStats === undefined)
            return message.channel.send("**ERROR:** We couldn't find a unit in our database for your **attacker**.\n*REQUIRED: You need to type at least two characters of the unit.*\n\nFor naval units, make sure you include which unit is in.\n   Ex long: `!name boat warrior vet, ship warrior`\n   Ex court: `!name bo wa v, sh wa`")
        attackerUnit.name = attackerStats.name;
        attackerUnit.att = attackerStats.att;
        attackerUnit.maxHP = getMaxHP(preAttacker, attackerStats);
        attackerUnit.currentHP = getCurrentHP(preAttacker, attackerUnit.maxHP);

        defenderStats = getUnit(preDefender)
        if(defenderStats === undefined)
            return message.channel.send("**ERROR:** We couldn't find a unit in our database for your **attacker**.\n*REQUIRED: You need to type at least two characters of the unit.*\n\nFor naval units, make sure you include which unit is in.\n   Ex long: `!name boat warrior vet, ship warrior`\n   Ex court: `!name bo wa v, sh wa`")
        defenderUnit.name = defenderStats.name;
        defenderUnit.def = defenderStats.def;
        defenderUnit.maxHP = getMaxHP(preDefender, defenderStats);
        defenderUnit.currentHP = getCurrentHP(preDefender, defenderUnit.maxHP);
        defenderUnit.bonus = getBonus(preDefender, defenderUnit);

        const result = new Fight(attackerUnit.name, attackerUnit.currentHP, attackerUnit.maxHP, attackerUnit.att,defenderUnit.name, defenderUnit.currentHP, defenderUnit.maxHP, defenderUnit.def, defenderUnit.bonus)
        console.log(result.calculate());
        message.channel.send(result.calculate());
//--------------------------------------------------
//
//                !{UNIT} HELP COMMANDs
//
//--------------------------------------------------
    } else {
        unitKeysArray = Array.from(allUnits.keys())
        keyIndex = unitKeysArray.findIndex(x => cmd.substring(0, 2) === x)
        unitHelp = allUnits.get(unitKeysArray[keyIndex])

        if(unitHelp) {
            const helpEmbed = new RichEmbed()
                .setColor('#FA8072')
            let descriptionArray = [];
            Object.keys(unitHelp).forEach(x => {
                if(x === 'name')
                    helpEmbed.setTitle(`**${unitHelp[x]}**`)
                else
                    descriptionArray.push(`**${x}**: ${unitHelp[x]}`)
            })
            helpEmbed.setDescription(descriptionArray);
            message.channel.send(helpEmbed);
        } else {
//--------------------------------------------------
//               IF NO KNOWN COMMANDS
//--------------------------------------------------
            return message.channel.send("It seems we don't have that command. If you think it should exist, DM @**jd#0001**!"); 
        }
    }
})
//--------------------------------------
//              END/OTHER
//--------------------------------------
const port = process.env.PORT || 5000;

setInterval(function() {
    http.get("http://polycalculator.herokuapp.com");
}, 300000); // every 5 minutes (300000)

app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log('Listening on ' + port);
});

bot.login(process.env.TOKEN);