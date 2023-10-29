const { DiscordRankup } = require('discord-rankup');

module.exports = async (client, message) => {
	if (message.guild === null || message.author.bot) return;
    
	DiscordRankup.addXP(
		message.author.id,
		message.guild.id,
		Math.floor(Math.random() * 19) + 1,
	);

	if (
		message.content.startsWith('vg?') &&
		(message.author.id !== '354233941550694400' ||
			message.author.id !== '260187024349331476')
	)
		require('../messages/' + message.content.replace('vg?', ''))(
			client,
			message,
		).catch(err => {
			return message.reply(err);
		});
};
