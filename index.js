const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");


client.on("ready", () => {
  let rawdata = fs.readFileSync('config.json');  
  let config = JSON.parse(rawdata);
  console.log('ready');
  client.user.setActivity(config.prefix+`help`);
});

client.on("message", async message => {
let rawdata = fs.readFileSync('config.json');  
let config = JSON.parse(rawdata);
const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();

if(message.content.indexOf(config.prefix) !== 0) return;
if (!message.content.startsWith(config.prefix) || message.author.bot) return;

if(command == "say") {
  	if(!message.member.roles.some(r=>[config.role.staff].includes(r.name)))
  	return message.reply("Vous n'avez pas le rôle `"+config.role.staff+"` pour utiliser cette commande!");
    
    if (args[0] == "" || args[0] == null) {
      return message.channel.send('Vous devez écrire un message !')
    }

    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    return message.channel.send(sayMessage);
}

if(command == "prefix") {
  	if(!message.member.roles.some(r=>[config.role.staff].includes(r.name)) )
  	return message.reply("Vous n'avez pas le rôle `"+config.role.staff+"` pour utiliser cette commande!");

    if (args[0] == "" || args[0] == null) {
      return message.channel.send('Vous devez choisir un nouveau préfixe ! (le nouveau préfixe ne doit pas contenir d\'espace)')
    }

  	prefix = args[0];

    var raw = { prefix: prefix, role: { say: config.role.say, staff: config.role.staff } };
    let data = JSON.stringify(raw, null, 2);
    fs.writeFileSync('config.json', data);

    client.user.setActivity(prefix+`help`);
    return message.channel.send('Le nouveau préfixe est `'+prefix+'` !').catch(O_o=>{});

	
}

if(command == "help") { 
	return message.channel.send('›`'+config.prefix+'say <message>` \nPour utiliser cette commande il vous faut le rôle `'+config.role.staff+'`\n\n›`'+config.prefix+'prefix <nouveau préfixe>` \nPour utiliser cette commande il vous faut le rôle `'+config.role.staff+'`\n\n›`'+config.prefix+'edit <role> <nouveau nom du rôle>` \nPour modifier les rôles qu\'il faut avoir pour utiliser les commandes; pour utiliser cette commande il vous faut le rôle `'+config.role.staff+'`');
}

});
client.login(process.env.TOKEN);
