const discord = require('discord.js');
const { DiscordRankup } = require('discord-rankup');

module.exports = {
	data: new discord.SlashCommandBuilder()
		.setName('rank')
		.setDescription('Veja o ranking!')
		.setDescriptionLocalizations({
			'pt-BR': 'Veja o ranking!',
			'en-US': 'View the ranking!',
		}),
	async execute(interaction, client) {
		await interaction.reply({ content: 'Pesquisando contéudo...' });
		let page;
		let buttonname;
		let collector;
		await Search(0);
		async function Search(pagina) {
			const level = await DiscordRankup.fetchLeaderboard(
				interaction.guild.id,
				{
					limit: 15,
					skip: pagina * 15,
				},
			);
			page = pagina;

			const str2 = Math.floor(Math.random() * 1000);
			buttonname = str2;
			const antes = new discord.ButtonBuilder()
				.setCustomId(str2 + 'prev')
				.setEmoji('1065370746303553587')
				.setStyle(2)
				.setDisabled(pagina === 0);
			const depois = new discord.ButtonBuilder()
				.setCustomId(str2 + 'next')
				.setEmoji('1065370743526916096')
				.setStyle(2)
				.setDisabled(level.length < 15);
			const botao = new discord.ActionRowBuilder()
				.addComponents(antes)
				.addComponents(depois);
			const levels = new discord.EmbedBuilder()
				.setTitle('TOP 15')
				.setColor(client.cor);
			if (level) {
				const fields = level.map((w, index) => ({
					name: `${pagina * 15 + 1 + index}. ${
						interaction.guild.members.cache.get(w.UserID)
							? interaction.guild.members.cache.get(w.UserID).user
									.username
							: w.UserID
					}`,
					value: `**XP:** ${w.XP.toLocaleString(
						'pt-BR',
					)}\n**Nível:** ${w.Level}`,
					inline: true,
				}));

				levels.addFields(...fields);
			}
			const mensagem = await interaction.editReply({
				content: null,
				embeds: [levels],
				components: [botao],
			});
			const filter = interaction =>
				interaction.customId === buttonname + 'next' ||
				interaction.customId === buttonname + 'prev';
			collector = mensagem.createMessageComponentCollector({
				filter,
				time: 300000,
			});
		}
		collector.on('collect', i => {
			if (i.user.id === interaction.member.id) {
				if (i.customId === buttonname + 'next') {
					i.deferUpdate();
					Search(page + 1);
				}
				if (i.customId === buttonname + 'prev') {
					i.deferUpdate();
					Search(page - 1);
				}
			} else {
				i.reply({
					content: 'Pesquisa deu inválido.',
					ephemeral: true,
				});
			}
		});
	},
};
