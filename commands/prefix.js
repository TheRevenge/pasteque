const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

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

}

module.exports.help = {
  name: "prefix"
}