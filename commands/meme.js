const { default: axios } = require('axios');
const { Discord, EmbedBuilder } = require('discord.js');
import axios from 'axios';
module.exports.run = async (bot, message, args) => {
	const embed = new EmbedBuilder();
	axios.get('https://www.reddit.com/r/memes/random/.json')
		.then(response => {
			const [list] = JSON.parse(response.body);
			const [post] = list.data.children;

			const permalink = post.data.permalink;
			const memeUrl = `https://reddit.com${permalink}`;
			const memeImage = post.data.url;
			const memeTitle = post.data.title;
			const memeUpvotes = post.data.ups;
			const memeNumComments = post.data.num_comments;
      //console.log(response);
			embed.setTitle(`${memeTitle}`);
			embed.setURL(`${memeUrl}`);
			embed.setColor('Random');
			embed.setImage(memeImage);
			embed.setFooter({
				text:`👍 ${memeUpvotes} 💬 ${memeNumComments}`
			});

			message.channel.send({ embeds: [embed] });
		})
		.catch(console.error);
};

module.exports.config = {
	name: 'meme',
	aliases: [],
};
