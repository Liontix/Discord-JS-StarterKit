const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const { Client, RichEmbed } = require('discord.js');

const config = JSON.parse(fs.readFileSync('botconfig.json', 'utf8'))

const client = new Discord.Client({disableEveryone: true});

client.on('ready', () => {
  console.log(`Our new id is ${client.user.username} get ready for the underground!`);//{client.user.username} this will print the name of your bot)
});

client.on('ready', () => { client.user.setActivity('Your Game') })//here you can write anything

client.on('message', (msg) => {
//this is a function handler
    var cont    = msg.content,
        author  = msg.member,
        chan    = msg.channel,
        guild   = msg.guild
  
    if (author != client.user && cont.startsWith(botconfig.prefix)){ //client.user.id author.id
  
      var invoke = cont.split(' ')[0].substr(botconfig.prefix.length),
          args   = cont.split(' ').slice(1)
  
      if (invoke in cmdmap) {
          cmdmap[invoke](msg, args)
      }
    }
  });
  
  //command handler this will load every javascript file in the commands folder
    fs.readdir("./commands/", (err, files) => {
    if (err) console.error(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js");// js request
  
    if (jsfiles.length <= 0) return console.log("There are no commands to load...");
  
    console.log(`Loading ${jsfiles.length} commands...`);
    jsfiles.forEach((f, i) => {
      let props = require(`./commands/${f}`);
      console.log(`${i + 1}: ${f} loaded!`);
      
    });
  });
  
  var cmdmap = { //after every new function you have to set a , !!!
    test: cmd_test,
    say: cmd_say,
    afktime: cmd_afktime
  };   
  
  function cmd_test(msg, args) {
    console.log("test successful")//this will print 'test successful' into your powershell
  }
  
  function cmd_say(msg, args) {
    msg.channel.send(args.join(' '));//this will take every think after you write .say (...) this will take everything after the command
    //for an example you write (YOURPREFIX)say Hey => the bot will send Hey
    msg.delete(30);//your message and the message from the bot will get deleted after 30ms (this is a 1/2 second)
    //60 = 1s, 120 = 2s, ...
  }
  //what you also can do is this
  client.on('message', message => {
    if (message.content === 'a embed') {// this is not for the handler!!! if you write "a embed" the bot will reply with a embed
      const embed = new RichEmbed() // this is the Desciption, Title and the color of it!!!
        .setTitle('A slick little embed')
        .setColor(0xFF0000)
        .setDescription('Hello, this is a slick embed!');
      message.channel.send(embed); //after create a embed it will send this to the channel where you triggert him with the keyword
    }
  });
  // this is a example for a help command with a embed
  client.on('message', message => {
    if (message.content === '.help') {//he will get triggert on ".help"
      const embed = new RichEmbed()//a embed
        .setTitle('What the ...Bot can do for you')//replace it with your bots name (if you want)
        .setColor(0xFF0000)//color
        .setDescription('.say , .test , .afktime');
      message.channel.send(embed);
    }
  });
  
 function cmd_afktime(msg,args){
    if(!msg.member.roles.some(r=>["Administrator", "Moderator"].includes(r.name)) )//a simple role check this is require for a kick command!!!
    return msg.reply("Sorry, you don't have permissions to use this!");{//normal return
    msg.guild.setAFKTimeout(args.join(' ')); //60, 300, 900, 1800, 3600 //this will check the number you set
    client.users.get(msg.author.id).send("Value must be one of (60, 300, 900, 1800, 3600).");// 60s = 1min ( this time is in seconds )
    msg.delete(30000);//your message and the message from the bot will get deleted after 30000ms 
    }
  } 
  
 //at least I want to give you a example for a kick command with mention
 client.on('kick', (msg) => {

    if(!message.member.roles.some(r=>["Administrator", "Moderator"].includes(r.name)) )//role check for the message author
      return message.reply("Sorry, you don't have permissions to use this!");//simple return
    
    let member = message.mentions.members.first() || message.guild.members.get(args[0]); //mention user check ('kick @Liontix')
    if(!member)
      return message.reply("Please mention a valid member of this server"); //if you didn't mentioned a member you will get this as a reply message
    if(!member.kickable) 
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    //check if you are allowed to kick this user 
    //example: you are a Administrator (Admin) and you want to kick the Owner this will popup (if his role is over yours)
  
    let reason = args.slice(1).join(' ');//reason for the kick
    if(!reason) reason = "No reason provided";//if the reason for the kick = null this will be the reason for the kick 
   
   });
  
  
  
  
  
  
  
  
  
  
  
  
  
