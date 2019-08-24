const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const http = require('http');
const port = process.env.PORT || 3000;
http.createServer().listen(port);

const client = new Discord.Client();
client.commands = new Discord.Collection();
const token = process.env.TOKEN;

var user="";
var badwords = ["bitch","fuck","fucking","shit","weeb"]
var yandere = ["I'll be watching over you, I'll be there forever, so don't think you're alone,darling  :heart:",
	"I'll cut of your hand, so I can hold it forever!:heart:",
	"Do you think if you ignore me, I would stop following you?:heart:",
	"Roses are red, handcuffs are naughty, if you ever left me, they'd never find your body.:heart:",
	"If I can not have you, no one can.:heart:",
	"You are mine, no one except me can have you!:heart:"];

client.once('ready', () => {
	console.log('Ready!');
});


client.on('message', message => {


	if(message.author === user){

		const args = message.content;
		var count = 0;
		for (var i = badwords.length - 1; i >= 0; i--) {
			badwords[i]
			if (args.includes(badwords[i])) {

				count = count+1;

			}
		}

		if (count != 0) {

			message.channel.send(message.author + " praised me!");

		}

		else{

			message.channel.send(yandere[Math.floor(Math.random() * yandere.length)]);

		}
		

	}


	if (message.content.startsWith(prefix)){
		if (message.member.hasPermission('ADMINISTRATOR')) {

			const args = message.content.slice(prefix.length).split(/ +/);
			const commandName = args.shift().toLowerCase();
			if(commandName === 'stalk'){

				try {
					user = message.mentions.users.first();
					message.channel.send("Stalking " + user);
				} catch (error) {
					console.error(error);
					message.reply('there was an error trying to execute that command!');
				}

			}	

			else if(commandName === 'stop'){

				try {
					user = "";
					message.channel.send("Fine. I will find someone else.");
				} catch (error) {
					console.error(error);
					message.reply('there was an error trying to execute that command!');
				}

			}

		}

		else{

			message.channel.send("You cant get rid of me that easy. I will stalk you forever and ever:heart:");

		}
		
		
	}

});
client.on('error',err => {
	console.log(err);
});

client.login(token);
