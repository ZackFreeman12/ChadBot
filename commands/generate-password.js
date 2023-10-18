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
		.setName('generate-password')
		.setDescription('generate a random password')
		.addIntegerOption((option => option.setName('length').setDescription('choose a length').setRequired(true)))
		.addBooleanOption((option => option.setName('exclude-numbers').setDescription('choose to exclude numbers').setRequired(true)))
		.addBooleanOption((option => option.setName('exclude-special-chars').setDescription('choose to exclude special characters').setRequired(true))),
	async execute(interaction) {
		const length = interaction.options.getInteger('length');
		const exNumber = interaction.options.getBoolean('exclude-numbers').toString();
		const exChar = interaction.options.getBoolean('exclude-special-chars').toString();
		const response = await axios.get("https://api.api-ninjas.com/v1/passwordgenerator?length=" + length +
			'&exclude_numbers=' + exNumber +
			'&exclude_special_chars=' + exChar, config);
		return interaction.reply({
			content: "New password: " + response.data.random_password,
			ephemeral: true
		});
	},
};