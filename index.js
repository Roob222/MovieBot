const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = '!';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./functions/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
  const command = require(`./functions/${file}`);

  client.commands.set(command.name, command);
}

const helpEmbed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Help')
    .setDescription('This is a list of my available commands')
    .addFields(
      { name: 'ping', value: 'Tests to see if I am awake'},
      { name: 'coinflip', value: 'I will flip a coin'},
      { name: 'meme', value: 'I will send a random meme'},
      { name: 'based', value: 'I will say some based shit'},
      { name: 'inbound', value: 'ENEMY AC-130 ABOVE!'},
      { name: 'help', value: 'I will list any commands I can perform'},
      
    )
    .setTimestamp()
    


client.once('ready', () => {
    console.log("I am human bean");
});

client.on('message', message =>{
  if(!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if(command === 'ping'){
    message.channel.send('pong!');

  }
  else if(command === 'coinflip'){
    client.commands.get('coinflip').execute(message,args);
   
  }
  else if(command === 'meme'){
    client.commands.get('meme').execute(message,args);

  }
  else if(command === 'help'){
   message.channel.send(helpEmbed);
  }
  else if(command === 'based'){
    var based = "based ";
    var rand = Math.floor(Math.random() * 100) + 1;
    console.log(rand);
    for(var i = 0; i <= rand; i++){
      based = based.concat("based ");
      console.log(i);
     
    }
    
    message.channel.send(based);
  }
  else if(command === 'inbound'){
    message.channel.send({files: ['sounds/ac130.mp3']});
  }

});



client.login('Your Token Here');
