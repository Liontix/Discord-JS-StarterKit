const Discord = require("discord.js");

const client = new Discord.Client({disableEveryone: true});

client.on('Join', function(member) {
    if(message.content === 'Join');
    member.send("Now you are a member");
    let memberRole = member.guild.roles.find("name", "Member");
    member.addRole(memberRole);
  });

