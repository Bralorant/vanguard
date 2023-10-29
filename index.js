const discord = require('discord.js');
const { DiscordRankup } = require('discord-rankup');

require('dotenv').config();

const client = new discord.Client({
	intents: 3276799,
	cacheWithLimits: {
		MessageManager: {
			sweepInterval: 300,
			sweepFilter: discord.Sweepers.filterByLifetime({
				lifetime: 60,
				getComparisonTimestamp: m =>
					m.editedTimestamp ?? m.createdTimestamp,
			}),
		},
	},
});
DiscordRankup.init(process.env.DB, client);

client.cor = '#d33c3c';
client.canais = {
	errors: '1147958842580279336',
};

process.on('unhandledRejection', error => {
	console.log(error);
});
process.on('uncaughtException', error => {
	console.log(error);
});

const boilerplateComponents = async () => {
	await require('./src/util/boilerplateClient')(client);
};

boilerplateComponents();
