/* "StAuth10222: I Zack Freeman, 000781330 certify that this material is my original work. 
No other person's work has been used without due acknowledgement. 
I have not made my work available to anyone else." */

const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');


const data = "grant_type=client_credentials&client_id=628d3f5ddf6b4442a10ff0553349b6fb&client_secret=392e4d121bc14deba6c888e752631d6a";

module.exports = {
	data: new SlashCommandBuilder()
		.setName('song-recommendation')
		.setDescription('Get a recommendation for a song from Spotify')
		.addStringOption(option => option.setName('genre').setDescription('what is the genre of the song').setRequired(true))
		.addStringOption(option => option.setName('sub-genre').setDescription('optional second genre of the song'))
		.addStringOption(option => option.setName('sub-sub-genre').setDescription('optional third genre of the song')),
	async execute(interaction) {
		const accessToken = await axios.post("https://accounts.spotify.com/api/token", data);
		const config = {
			headers:
			{
				'Authorization': 'Authorization: Bearer ' + accessToken.data.access_token
			}

		}
		const genre = interaction.options.getString('genre');
		const genre1 = ", " + interaction.options.getString('sub-genre') ?? ""
		const genre2 = ", " + interaction.options.getString('sub-sub-genre') ?? ""
		const response = await axios.get("https://api.spotify.com/v1/recommendations?seed_genres=" + genre + genre1 + genre2 + '&limit=1', config);
		if (genre1 == ", null") {
			if (genre2 != ", null") {
				return interaction.reply('Recommendation for ' + genre + genre2 + '\n' + response.data.tracks[0].external_urls.spotify);
			}
			else {
				return interaction.reply('Recommendation for ' + genre + '\n' + response.data.tracks[0].external_urls.spotify);
			}


		}
		else if (genre2 == ", null") {
			return interaction.reply('Recommendation for ' + genre + genre1 + '\n' + response.data.tracks[0].external_urls.spotify);
		}
		else {
			return interaction.reply('Recommendation for ' + genre + genre1 + genre2 + '\n' + response.data.tracks[0].external_urls.spotify);
		}

	},
};

