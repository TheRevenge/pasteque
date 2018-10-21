const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

if(command == "help") { 
    return message.channel.send('›`'+config.prefix+'say <message>` \nPour utiliser cette commande il vous faut le rôle `'+config.role.staff+'`\n\n›`'+config.prefix+'prefix <nouveau préfixe>` \nPour utiliser cette commande il vous faut le rôle `'+config.role.staff+'`\n\n›`'+config.prefix+'edit <role> <nouveau nom du rôle>` \nPour modifier les rôles qu\'il faut avoir pour utiliser les commandes; pour utiliser cette commande il vous faut le rôle `'+config.role.staff+'`');
}

}

module.exports.help = {
  name: "help"
}