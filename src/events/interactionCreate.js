module.exports = (client, interaction) => {
	if (interaction.isChatInputCommand()) {
		const command = client.commands.get(interaction.commandName);
		if (!command) return;
		command.execute(interaction, client);
	}
};
