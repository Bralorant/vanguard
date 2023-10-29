const discord = require('discord.js');
const { DiscordRankup } = require('discord-rankup');

module.exports = {
	data: new discord.SlashCommandBuilder()
		.setName('level')
		.setNameLocalizations({ 'pt-BR': 'nível', 'en-US': 'level' })
		.setDescription('Veja o seu nível!')
		.setDescriptionLocalizations({
			'pt-BR': 'Veja o seu nível!',
			'en-US': 'View your level!',
		}),
	async execute(interaction, client) {
		const info = await DiscordRankup.getCardData(
			interaction.member.id,
			interaction.guild.id,
		);
		const rank = await DiscordRankup.getRank(
			interaction.member.id,
			interaction.guild.id,
		);
		interaction.reply({
			embeds: [
				new discord.EmbedBuilder()
					.setColor(client.cor)
					.setTitle(interaction.user.tag)
					.setDescription(
						`**Nível:** ${info.level}\n**Progresso:** ${info.currentXP}/${info.requiredXP}\n**Rank:** ${rank}`,
					)
					.setThumbnail(
						interaction.member.displayAvatarURL({
							extension: 'png',
							size: 512,
						}),
					),
			],
		});
	},
};





