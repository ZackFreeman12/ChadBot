/* "StAuth10222: I Zack Freeman, 000781330 certify that this material is my original work. 
No other person's work has been used without due acknowledgement. 
I have not made my work available to anyone else." */

const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const config = {
	headers:
	{
		'X-Api-Key': 'UhaamEkrmJnsu9Yl2MazrFWN6D5k9vhmq093fkpL'
	}
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sentiment')
		.setDescription('Analyzes sentiment of a message')
		.addStringOption((option => option.setName('text').setDescription('input the text').setRequired(true))),
	async execute(interaction) {
		const text = interaction.options.getString('text');
		const response = await axios.get("https://api.api-ninjas.com/v1/sentiment?text=" + text, config);
		return interaction.reply(text + "\nThe sentiment of this message is: " + response.data.sentiment);
	},
};
