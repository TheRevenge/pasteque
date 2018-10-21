const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client({disableEveryone: true});
client.commands = new Discord.Collection();

let rawconfig = fs.readFileSync('config.json');  
let config = JSON.parse(rawconfig);
let token = process.env.TOKEN;


fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    client.commands.set(props.help.name, props);
  });
});


client.on("ready", () => {
  console.log('ready '+client.guilds.size+" serveurs | "+config.prefix+`help`);
  client.user.setActivity(client.guilds.size+" serveurs | "+config.prefix+`help`, {type: "WATCHING"});
});

client.on("message", async message => {
const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();

if(message.content.indexOf(config.prefix) !== 0) return;
if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let commandfile = client.commands.get(cmd.slice(config.prefix.length));
  if(commandfile) commandfile.run(client,message,args,command,config,fs);


});
client.login(token);