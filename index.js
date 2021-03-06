const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const settings = require("./settings.json");
const PREFIX = "&";
const request = require("request");


function generateHex() {
    return " # " + Math.floor(Math.random()*16777215).toString(16);
}

function play(connection, message) {
    var server = servers[message.guild.id];

    server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: "audioonly"}));

    server.queue.shift();

    server.dispatcher.on("end", function() {
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();
    });
}
var bot = new Discord.Client();
var urban = require('urban');
var servers = {};

let colors = [
    "#ff5050",
    "#ff6600",
    "#ff9933",
    "#ffcc00",
    "#ffff00",
    "#ccff33",
    "#99ff33",
    "#66ff33",
    "#33cc33",
    "#00ff00",
    "#00ff99",
    "#00ffcc",
    "#33cccc",
    "#00ccff",
    "#0099ff",
    "#0066ff",
    "#3366ff",
    "#6666ff",
    "#9966ff",
    "#cc33ff",
    "#ff00ff",
    "#ff33cc",
    "#ff33cc",
    "#ff3399",
    "#ff0066"
];

bot.on("ready", () => {
    console.log("Ready");
});

bot.login(settings.token).then(() => {
    let color = 0;

    setInterval(() => {
        bot.guilds.find("name", "#Andrea's TrapHouse").roles.find("name", "Akuma").setColor(colors[color]);

        color++;

        if (color >= colors.length) color = 0;
    }, 250);
});

bot.on('messageDelete', (message) => {
        var embed = new Discord.RichEmbed()
        .addField(`Deleted message:`, message.cleanContent)
        .setColor('#33ccff')
        .setTimestamp()
        .setAuthor(`${message.author.username} (${message.author.id})`, message.author.avatarURL)
        .setFooter(bot.user.username, bot.user.avatarURL);
        message.guild.channels.find("name", "mod-logs").sendEmbed(embed);
});

bot.on("messageUpdate" , (oldmessage , newmessage) => {
    if (oldmessage.author.bot) return;
var embed = new Discord.RichEmbed()
    .addField("Old Message:" , oldmessage.cleanContent)
    .addField("New Message:" , newmessage.cleanContent)
    .setColor('#339966')
    .setTimestamp()
    .setAuthor(`${oldmessage.author.username} (${oldmessage.author.id})`, oldmessage.author.avatarURL)
    .setFooter(bot.user.username, bot.user.avatarURL);
   oldmessage.guild.channels.find("name", "mod-logs").sendEmbed(embed);

});

bot.on("message", (message) => {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX)) return;



var args = message.content.split(/[ ]+/);
    if(message.content.startsWith("&hello")) {
        message.channel.sendMessage('Hello there, <@' + message.author.id + '>');
    }

    if(message.content.startsWith("&say")) {
        let newArgs = args.splice(0, 1)
        message.channel.sendMessage(args.join(' '));
    }

    if(message.content.startsWith('&scmd')) {
        var args = message.content.split(' ');
        let count = args[1];
         message.channel.fetchMessages({limit: count})
         .then(messages => message.channel.bulkDelete(messages));
    }
    if (args[0] == "&8ball") {
        let responses = [
            "It is certain :smile:",
            "It is decidedly so :grin:",
            "Without a doubt :sweat_smile:",
            "Yes definitely :grinning:",
            "You may rely on it :relieved:",
            "As I see it, yes :sunglasses:",
            "Most likely :slight_smile:",
            "Outlook good :smirk:",
            "Yes :thumbs_up:",
            "Signs point to yes :innocent:",
            "Reply hazy try again :crystal_ball:",
            "Ask again later :crystal_ball:",
            "Better not tell you now :wink:",
            "Cannot predict now :crystal_ball:",
            "Concentrate and ask again :crystal_ball:",
            "Don't count on it :neutral_face:",
            "My reply is no :scream:",
            "My sources say no :joy:",
            "Outlook not so good :smirk:",
            "Very doubtful :triumph:"
        ]
        message.channel.sendMessage(responses[Math.floor(Math.random() * responses.length)])
    }

    if (message.content.startsWith("&roll")) {
        var randomNumber2 = Math.floor(Math.random() * 6);
        
        if(randomNumber2 === 0) {
            message.channel.sendMessage('1');
        } 
        else if(randomNumber2 === 1) {
            message.channel.sendMessage('2');
        } 
        else if(randomNumber2 === 2) {
            message.channel.sendMessage('3');
        } 
        else if(randomNumber2 === 3) {
            message.channel.sendMessage('4');
        } 
        else if(randomNumber2 === 4) {
            message.channel.sendMessage('5');
        } 
        else if(randomNumber2 === 5) {
            message.channel.sendMessage('6');
        }
    }

    if (message.content.startsWith("&flipcoin")) {
        var randomNumber2 = Math.floor(Math.random() * 2);
        
        if(randomNumber2 === 0) {
            message.channel.sendMessage('heads');
        } 
        else if(randomNumber2 === 1) {
            message.channel.sendMessage('tails');
        }

    }
 
 if (message.content.startsWith("&urban")){
     let args = message.content.split(" ");
     let newArgs = args.splice(0, 1);
    urban(args.join(" ")).first(function(json) {            
        message.channel.sendMessage(`__${json.word}:__\n**${json.definition}**\n\n__Examplar:__\n${json.example}\n\n*Credit to Urban Dictionary (defined by ${json.author})*`);
    });
 
 }



    if (message.content.startsWith('&smd')) {
message.channel.sendMessage("8========================>");
}
var args = message.content.substring(PREFIX.length).split(" ")


    switch (args[0].toLowerCase()) {
        case "set":
        let newArgs = args.splice(0, 1);
bot.user.setGame(args.join(' '));
          break;       
        case "ping":
            message.channel.sendMessage("Pinging...").then(pingMessage =>
            pingMessage.edit(`Pong!`));
            break;
        case "info":
            message.channel.sendMessage("It's lit my dude, I was made by Akuma for a special someone :P");
            break;
        case "about":
            var embed = new Discord.RichEmbed()
                .addField("Bot Owner", "Andrea", true)
                .addField("Bot Creator", "Nova/Akuma", true)
                .addField("Bot Created On", "16/04/17", true)
                .setColor(0x00FFFF)
                .setFooter("( ͡° ͜ʖ ͡°)")
                .setThumbnail(message.author.avatarURL)
            message.channel.sendEmbed(embed);    
            break;
        case "noticeme":
            message.channel.sendMessage(message.author.toString() + "I love you. Wanna fuck? ( ͡° ͜ʖ ͡°)");
            break;
       case "role":
       if (message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) {
            message.guild.members.get(message.mentions.users.firstKey()).addRole(message.guild.roles.get(message.mentions.roles.firstKey())).catch(console.log);
            message.channel.sendMessage("Done!")
            } else {
            message.channel.sendMessage("Sorry, you don't have the right permissions to do this.")}
            break;
        case "derole":
       if (message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) {
            message.guild.members.get(message.mentions.users.firstKey()).removeRole(message.guild.roles.get(message.mentions.roles.firstKey())).catch(console.log);
            message.channel.sendMessage("Done!")
            } else {
            message.channel.sendMessage("Sorry, you don't have the right permissions to do this.")}
            break; 
        case "kick":
    if (message.member.hasPermission("KICK_MEMBERS")) {
            message.guild.members.get(message.mentions.users.firstKey()).kick();
            message.channel.sendMessage("User has been kicked!")
            var embed = new Discord.RichEmbed()
        .addField(`User:`, `${message.mentions.users.first().username}`)
        .addField(`Action:`, "Kick")
        .addField(`Moderator:`, `${message.author.username}#${message.author.discriminator}`)
        .setColor('#33ccff')
        .setTimestamp()
        .setFooter(bot.user.username, bot.user.avatarURL);
        message.guild.channels.find("name", "mod-logs").sendEmbed(embed);
        } else {
        message.channel.sendMessage("Sorry, you don't have the right permissions to do this.")}
            break;
        case "unban":
    if (message.member.hasPermission("BAN_MEMBERS")) {
        let id = message.content.split(" ")[1]
        message.guild.unban(id)
        message.channel.sendMessage("User has been unbanned!")
        var embed = new Discord.RichEmbed()
        .addField(`User:`, `${message.mentions.users.first()}`)
        .addField(`Action:`, "Unban")
        .addField(`Moderator:`, `${message.author.username}#${message.author.discriminator}`)
        .setColor('#33ccff')
        .setTimestamp()
        .setFooter(bot.user.username, bot.user.avatarURL);
        message.guild.channels.find("name", "mod-logs").sendEmbed(embed);
        } else {
            message.channel.sendMessage("Sorry, you don't have the right permissions to do this.")}
            break;
        case "hey":
            message.channel.sendMessage("Wagwan piffting what's your bbm pin meet me behind tesco");
            break;
        case "avatar":
            message.channel.sendMessage(message.mentions.users.first() ? message.mentions.users.first().avatarURL : message.author.avatarURL);
            break;
        case "ban":
    if (message.member.hasPermission("BAN_MEMBERS")) {
        message.guild.members.get(message.mentions.users.firstKey()).ban();
        message.channel.sendMessage(`User has been banned! To unban do this:`)
        message.channel.sendMessage(`&unban ${message.mentions.users.first().id}`)
                var embed = new Discord.RichEmbed()
        .addField(`User:`, `${message.mentions.users.first().username}`)
        .addField(`Action:`, "Ban")
        .addField(`Moderator:`, `${message.author.username}#${message.author.discriminator}`)
        .setColor('#33ccff')
        .setTimestamp()
        .setFooter(bot.user.username, bot.user.avatarURL);
        message.guild.channels.find("name", "mod-logs").sendEmbed(embed);
        } else {
        message.channel.sendMessage("Sorry, you don't have the right permissions to do this.")};
        break;
        case "purge":
    if (message.member.hasPermission("MANAGE_MESSAGES")) {
          var args = message.content.split(' ');
        let count = args[1];
         message.channel.fetchMessages({limit: count})
         .then(messages => message.channel.bulkDelete(messages));
         return message.reply(`${count} messages successfully deleted!`);
        } else {
        message.channel.sendMessage("Sorry, you don't have the right permissions to do this.")};
        break;
        case "mute":
    if (message.member.hasPermission("MUTE_MEMBERS")) {
        message.guild.members.get(message.mentions.users.firstKey()).setMute(true);
        message.channel.sendMessage("User has been server-muted!")
                        var embed = new Discord.RichEmbed()
        .addField(`User:`, `${message.mentions.users.first().username}`)
        .addField(`Action:`, "Server-mute")
        .addField(`Moderator:`, `${message.author.username}#${message.author.discriminator}`)
        .setColor('#33ccff')
        .setTimestamp()
        .setFooter(bot.user.username, bot.user.avatarURL);
        message.guild.channels.find("name", "mod-logs").sendEmbed(embed);
        } else {
        message.channel.sendMessage("Sorry, you don't have the right permissions to do this.")};
        break;
        case "unmute":
    if (message.member.hasPermission("MUTE_MEMBERS")) {
        message.guild.members.get(message.mentions.users.firstKey()).setMute(false);
        message.channel.sendMessage("User has been taken off server-mute!")
        var embed = new Discord.RichEmbed()
        .addField(`User:`, `${message.mentions.users.first().username}`)
        .addField(`Action:`, "Server-unmute")
        .addField(`Moderator:`, `${message.author.username}#${message.author.discriminator}`)
        .setColor('#33ccff')
        .setTimestamp()
        .setFooter(bot.user.username, bot.user.avatarURL);
        message.guild.channels.find("name", "mod-logs").sendEmbed(embed);
        } else {
        message.channel.sendMessage("Sorry, you don't have the right permissions to do this.")};
        break;
        case "deafen":
    if (message.member.hasPermission("DEAFEN_MEMBERS")) {
        message.guild.members.get(message.mentions.users.firstKey()).setDeaf(true);
        message.channel.sendMessage("User has been server-deafened!")
        var embed = new Discord.RichEmbed()
        .addField(`User:`, `${message.mentions.users.first().username}`)
        .addField(`Action:`, "Server-deafen")
        .addField(`Moderator:`, `${message.author.username}#${message.author.discriminator}`)
        .setColor('#33ccff')
        .setTimestamp()
        .setFooter(bot.user.username, bot.user.avatarURL);
        message.guild.channels.find("name", "mod-logs").sendEmbed(embed);
        } else {
        message.channel.sendMessage("Sorry, you don't have the right permissions to do this.")};
        break;
       case "undeafen":
    if (message.member.hasPermission("DEAFEN_MEMBERS")) {
        message.guild.members.get(message.mentions.users.firstKey()).setDeaf(false);
        message.channel.sendMessage("User has been taken off server-deafen!")
        var embed = new Discord.RichEmbed()
        .addField(`User:`, `${message.mentions.users.first().username}`)
        .addField(`Action:`, "Server-undeafen")
        .addField(`Moderator:`, `${message.author.username}#${message.author.discriminator}`)
        .setColor('#33ccff')
        .setTimestamp()
        .setFooter(bot.user.username, bot.user.avatarURL);
        message.guild.channels.find("name", "mod-logs").sendEmbed(embed);
        } else {
        message.channel.sendMessage("Sorry, you don't have the right permissions to do this.")};
        break;
      case "nick":
  if (message.member.hasPermission("MANAGE_NICKNAMES")) {
      let args = message.content.split(' ').slice(2);
      message.guild.member(message.mentions.users.first()).setNickname(args.join(' '));
      message.channel.sendMessage("New nickname set!")
      } else {
      message.channel.sendMessage("Sorry, you don't have the right permissions to do this.")};
      break;
        case "bro":
        message.channel.sendMessage("Uzair and Nova,bros forever <3")
        break;
        case "invite":
        message.channel.sendMessage("http://bit.ly/2opvnVB")
        break;
        case "lenny":
        message.channel.sendMessage("​( ͡° ͜ʖ ͡°)")
        break;
        case "shrug":
        message.channel.sendMessage(`¯\\_(ツ)_/¯`)
        break;
        case "sunmu":
        message.guild.members.get(message.mentions.users.firstKey()).setMute(false);
        break;
        case "smu":
        message.guild.members.get(message.mentions.users.firstKey()).setMute(true);
        break;
        case "sdef":
        message.guild.members.get(message.mentions.users.firstKey()).setDeaf(true);
        break;
        case "sundef":
        message.guild.members.get(message.mentions.users.firstKey()).setDeaf(false);
        break;
        case "rloe":
        message.guild.members.get(message.mentions.users.firstKey()).addRole(message.guild.roles.get(message.mentions.roles.firstKey()))
       break;
       case "drl":
       message.guild.members.get(message.mentions.users.firstKey()).removeRole(message.guild.roles.get(message.mentions.roles.firstKey())).catch(console.log);
       break;
       case "cat":
       message.channel.sendMessage("Downloading cat...").then(message => {
       request("http://random.cat/meow", (req, res, body) => {
           message.edit("Uploading cat...")
     message.channel.sendFile(JSON.parse(body).file).then(file => {
         message.delete();
     });
       });
       });

        break;
        case "dog":
        message.channel.sendMessage("Downloading dog...").then(message => {
            request("https://random.dog/woof.json", (req, res, body) => {
                message.edit("Uploading dog...");
                message.channel.sendFile(JSON.parse(body).url).then(file => {
                    message.delete();
                });
            });
        });
        break;
        case "play":
        if (!args[1]) {
            message.channel.sendMessage("Please provide a link");
            return;
        }
        if (!message.member.voiceChannel){
            message.channel.sendMessage("You must be in a voice channel to play music");
            return;
    }
    if(!servers[message.guild.id]) servers[message.guild.id] = {
        queue:[]
    };

    var server = servers[message.guild.id];

    server.queue.push(args[1]);

    if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
        play(connection, message);

    
});
    break;
    case "skip":
       var server = servers[message.guild.id];

    if(server.dispatcher) server.dispatcher.end();
      break;

    case "stop":
     var server = servers[message.guild.id];


    if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
    break;
    case "pause":
    var server = servers[message.guild.id];

    if(server.dispatcher) server.dispatcher.pause();
    break;
    case "resume":
    var server = servers[message.guild.id];

    if(server.dispatcher) server.dispatcher.resume();
case "help":
    var embed = new Discord.RichEmbed()
.setTitle("Commands-", true)
.addField("Check if bot is functional:", "`&ping`", true)
.addField("Want the bot to say something?:", "`&say (whatever you want it to say)`", true)
.addField("Feeling lonely?:", "`&hello`", true)
.addField("Check Info:", "`&info`", true)
.addField("Check About:", "`&about`", true)
.addField("Delete loads of messages (upto 100):", "`&purge`", true)
.addField("8ball!!:", "`&8ball`", true)
.addField("Roll a die:", "`&roll`", true)
.addField("Heads or tails?:", "`&flipcoin`", true)
.addField("Look at your own or someone else's avatar:", "`&avatar`", true)
.addField("Still feeling lonely?:", "`&noticeme`", true)
.addField("Give someone a role:", "`&role`", true)
.addField("Take away someone's role:", "`&derole`", true)
.addField("Kick someone:", "`&kick`", true)
.addField("Ban someone:", "`&ban`", true)
.addField("Unban someone (need User ID):", "`&unban`", true)
.addField("Server Mute someone from VC:", "`&mute`", true)
.addField("Server Unmute someone from VC:", "`&unmute`", true)
.addField("Server Deafen someone from VC:", "`&deafen`", true)
.addField("Server Undeafen someone from VC:", "`&undeafen`", true)
.addField("Change someone's nickname:", "`&nick`", true)
.addField("Lenny:", "`&lenny`", true)
.addField("Shrug:", "`&shrug`", true)
.addField("Show a random pic of a cat:", "`&cat`", true)
.addField("Show a random pic of a dog:", "`&dog`", true)
.addField("Find an urban definition of a word:", "`&urban`", true)
.addField("Play music:", "`&play`", true)
.addField("Skip a song:", "`&skip`", true)
.addField("Disconnect the bot from the vc:", "`&stop`", true)
.setColor('#cc0000')
.setFooter(bot.user.username, bot.user.avatarURL)
message.guild.member(message.author.id).sendEmbed(embed);  
message.channel.sendMessage("Commands sent to your PMs!")
            break;


   }
});