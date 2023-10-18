/* "StAuth10222: I Zack Freeman, 000781330 certify that this material is my original work. 
No other person's work has been used without due acknowledgement. 
I have not made my work available to anyone else." */

const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const { adzunaKey } = require('./config.json');
const { adzunaID } = require('./config.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('job-categories')
		.setDescription('Get avialable catagories for the job search command')
		.addStringOption(option => option.setName('country-code').setDescription('set the country code i.e "ca" for canada').setRequired(true)),
	async execute(interaction) {
		const country = interaction.options.getString('country-code');
		const response = await axios.get("https://api.adzuna.com/v1/api/jobs/" + country + "/categories?app_id=" + adzunaID + "&app_key=" + adzunaKey);
		var output = 'Catagories available: \n';
		response.data.results.forEach(e => {
			output = output + e.label + '\n';
		});
		return interaction.reply(output);
	},
};
