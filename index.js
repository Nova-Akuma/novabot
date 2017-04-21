const Discord = require("discord.js");
const yt = require('ytdl-core');
const settings = require("./settings.json");
const PREFIX = "&";

function generateHex() {
    return " # " + Math.floor(Math.random()*16777215).toString(16);
}

var bot = new Discord.Client();


bot.on("ready", (message) => {
    console.log("Ready");
})

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

    if (message.content.startsWith("&8ball")) {
        var randomNumber2 = Math.floor(Math.random() * 20);

        if(randomNumber2 === 1) {
            message.channel.sendMessage('It is certain :smile:');
        } 
        else if(randomNumber2 === 2) {
            message.channel.sendMessage('It is decidedly so :grin:');
        } 
        else if(randomNumber2 === 3) {
            message.channel.sendMessage('Without a doubt :sweat_smile:');
        } 
        else if(randomNumber2 === 4) {
            message.channel.sendMessage('Yes definitely :grinning:');
        } 
        else if(randomNumber2 === 5) {
            message.channel.sendMessage('You may rely on it :relieved:');
        } 
        else if(randomNumber2 === 6) {
            message.channel.sendMessage('As I see it, yes :sunglasses:');
        } 
        else if(randomNumber2 === 7) {
            message.channel.sendMessage('Most likely :slight_smile:');
        } 
        else if(randomNumber2 === 8) {
            message.channel.sendMessage('Outlook good :smirk:');
        } 
        else if(randomNumber2 === 9) {
            message.channel.sendMessage('Yes :thumbs_up:');
        } 
        else if(randomNumber2 === 10) {
            message.channel.sendMessage('Signs point to yes :innocent:');
        } 
        else if(randomNumber2 === 11) {
            message.channel.sendMessage('Reply hazy try again :crystal_ball: ');
        } 
        else if(randomNumber2 === 12) {
            message.channel.sendMessage('Ask again later :crystal_ball: ');
        } 
        else if(randomNumber2 === 13) {
            message.channel.sendMessage('Better not tell you now :wink:');
        } 
        else if(randomNumber2 === 14) {
            message.channel.sendMessage('Cannot predict now :crystal_ball: ');
        } 
        else if(randomNumber2 === 15) {
            message.channel.sendMessage('Concentrate and ask again :crystal_ball: ');
        } 
        else if(randomNumber2 === 16) {
            message.channel.sendMessage("Don't count on it :neutral_face:");
        } 
        else if(randomNumber2 === 17) {
            message.channel.sendMessage('My reply is no :scream:');
        } 
        else if(randomNumber2 === 18) {
            message.channel.sendMessage('My sources say no :joy:');
        } 
        else if(randomNumber2 === 19) {
            message.channel.sendMessage('Outlook not so good :smirk:');
        } 
        else if(randomNumber2 === 20) {
            message.channel.sendMessage('Very doubtful :triumph:');
        } 

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
            message.guild.members.get(message.mentions.users.first()).kick();
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
        message.channel.sendMessage(`User has been banned! ${message.mentions.users.first().id} is the id (to unban , just do &unban (that ID right there)`  )
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
        case "s-mute":
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
        case "s-unmute":
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
        case "s-deafen":
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
       case "s-undeafen":
    if (message.member.hasPermission("DEAFEN_MEMBERS")) {
        message.guild.members.get(message.mentions.users.first()).setDeaf(false);
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
      case "set-nick":
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
.addField("Server Mute someone from VC:", "`&s-mute`", true)
.addField("Server Unmute someone from VC:", "`&s-unmute`", true)
.addField("Server Deafen someone from VC:", "`&s-deafen`", true)
.addField("Server Undeafen someone from VC:", "`&s-undeafen`", true)
.addField("Change someone's nickname:", "`&set-nick`", true)
.addField("Lenny:", "`&lenny`", true)
.addField("Shrug:", "`&shrug`", true)
.setColor('#cc0000')
.setFooter(bot.user.username, bot.user.avatarURL)
message.guild.member(message.author.id).sendEmbed(embed);  
message.channel.sendMessage("Commands sent to your PMs!")
            break;


   }
});
bot.login(settings.token);
