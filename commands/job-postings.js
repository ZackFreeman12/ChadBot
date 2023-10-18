/* "StAuth10222: I Zack Freeman, 000781330 certify that this material is my original work. 
No other person's work has been used without due acknowledgement. 
I have not made my work available to anyone else." */

const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const { adzunaKey } = require('./config.json');
const { adzunaID } = require('./config.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('job-postings')
		.setDescription('Get job postings, max return 5')
		.addStringOption(option => option.setName('country-code').setDescription('set the country code i.e "ca" for canada').setRequired(true))
		.addIntegerOption(option => option.setName('page').setDescription('Set the page number').setRequired(true))
		.addIntegerOption(option => option.setName('results-limit').setDescription('How many results to return, Max 5').setRequired(true))
		.addStringOption(option => option.setName('category').setDescription('Set the category, Use - instead of spaces i.e Travel-jobs').setRequired(true)),
	async execute(interaction) {
		const country = interaction.options.getString('country-code');
		const page = interaction.options.getInteger('page');
		const resultsLimit = interaction.options.getInteger('results-limit');
		const category = interaction.options.getString('category');
		if (resultsLimit > 5 || resultsLimit < 1) {
			return interaction.reply("Please set a results-limit between 1 - 5.");
		}
		const response = await axios.get("https://api.adzuna.com/v1/api/jobs/" +
			country + "/search/" + page + "?app_id=" + adzunaID + "&app_key=" + adzunaKey + "&results_per_page=" +
			resultsLimit + '&category=' + category);
		var output = 'Jobs Found: \n';
		response.data.results.forEach(e => {
			output = output + e.title + '\n' + e.redirect_url + '\n';
		});
		return interaction.reply(output);
	},
};
