const Discord = require("discord.js");

module.exports.run = async (client, message, args, command, config, fs) => {

      if(command == "say") {
  	if(!message.member.roles.some(r=>[config.role.staff].includes(r.name)))
  	return message.reply("Vous n'avez pas le rôle `"+config.role.staff+"` pour utiliser cette commande!");
    
    if (args[0] == "" || args[0] == null) {
      return message.channel.send('Vous devez écrire un message !')
    }


	const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{});
	if (message.author.id == "372778933839593483") {
		return message.channel.send('[Object] [Object]');
	} else { 
    message.channel.send(sayMessage);
	}

	}

}

module.exports.help = {
  name: "say"
}
