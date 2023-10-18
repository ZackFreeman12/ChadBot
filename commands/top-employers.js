/* "StAuth10222: I Zack Freeman, 000781330 certify that this material is my original work. 
No other person's work has been used without due acknowledgement. 
I have not made my work available to anyone else." */

const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const { adzunaKey } = require('./config.json');
const { adzunaID } = require('./config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('top-employers')
		.setDescription('view some top employers in a given area')
		.addStringOption((option => option.setName('country-code').setDescription('set the country code i.e "ca" for canada').setRequired(true)))
		.addStringOption((option => option.setName('search').setDescription('search for some keywords').setRequired(true))),
	async execute(interaction) {
		const country = interaction.options.getString('country-code');
		const search = interaction.options.getString('search');

		const response = await axios.get("https://api.adzuna.com/v1/api/jobs/" + country + "/top_companies?app_id=" + adzunaID + "&app_key=" + adzunaKey + "&what=" + search);

		var output = 'Top Employers for ' + search + ': \n';
		response.data.leaderboard.forEach(e => {
			output = output + e.canonical_name + '\n';
		});

		return interaction.reply(output);
	},
};
