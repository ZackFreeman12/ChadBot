/* "StAuth10222: I Zack Freeman, 000781330 certify that this material is my original work. 
No other person's work has been used without due acknowledgement. 
I have not made my work available to anyone else." */

const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const { openaikey } = require('./config.json');
const { OpenAI } = require("openai");
const { channelId } = require('./config.json');
const botPersonality = "you are chad, you have a big ego and love to gloat.";
const client = new Client({
	intents: [GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent,]
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');

const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});


client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

const openai = new OpenAI({
	apiKey: openaikey
});


client.on('messageCreate', async (message) => {
	if (message.author.bot) return;
	/* if (message.channel.id !== channelId) return; */
	if (message.content.startsWith('chadbot,')) {
		let conversationLog = [{ role: 'system', content: botPersonality }]

		await message.channel.sendTyping();

		let prevMessages = await message.channel.messages.fetch({ limit: 5 });
		prevMessages.reverse();

		prevMessages.forEach((msg) => {
			if (msg.author.id !== client.user.id && message.author.bot) return;
			if (msg.author.id !== message.author.id) return;
			if (message.content.startsWith('chadbot,')) {
				conversationLog.push({
					role: 'user',
					content: msg.content,
				})
			}
		})

		const result = await openai.chat.completions.create({
			model: 'gpt-3.5-turbo',
			messages: conversationLog
		})

		message.reply(result.choices[0].message);
	}
})

client.login(token);
