
const Discord = require('discord.js');
const clientId = "ClientID";
const token = "Tooken";
const { Routes } = require('discord-api-types/v9'); 
const { REST } = require('@discordjs/rest');
const voice = require('@discordjs/voice');
const { channel } = require('diagnostics_channel');
const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('util').promisify(setTimeout);
const yts = require( 'yt-search' );
const ytdl = require("ytdl-core");
const playdl = require('play-dl')
const { DiscordTogether } = require('discord-together');
const { ApplicationCommandOptionTypes } = require("discord.js");
const { ApplicationCommandOptionType } = require("discord-api-types/v9");
const { type } = require('os');

// Create a new client instance
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_VOICE_STATES, Discord.Intents.FLAGS.GUILD_MEMBERS] });


// When the client is ready, run this code (only once)
client.once('ready', () =>
 {
	console.log(`\n Ready! Ich bin nun eingeloggt als ${client.user.tag}!`);

  setInterval(function(){
    let statuses = [
        'Fuego City',
        'den Manager Bot'
    ];
    let status = statuses[Math.floor(Math.random() * statuses.length)];
    client.user.setActivity(status);
}, 10000);
	
});
//CODE
//Definiere Slash Commands
const commands = [
	{
		name: 'ping',
		description: 'Gibt die Latenz des Bots aus.'
	},
  {
		name: 'frakbewerbung',
		description: 'Sendet alles für die Frak bewerbung.'
	},
    {
		name: 'teambewerbung',
		description: 'Sendet alles für die Team bewerbung.'
	},
	{
		name: 'announcement',
		description: 'Sendet ein Announcement',
		options: [
			{
			type: 3,
			name: 'message',
			description: 'Gib hier deine Nachricht ein',
			required: true,
			},
			{
				type: ApplicationCommandOptionType.Channel,
				name: 'channel',
				description: 'Gib hier den Channel ein in welchen die Nachricht gesendet werden soll.',
				required: true,
				}
		]
	},    
	{
		name: 'tb_vorlage',
		description: 'Sendet die Vorlage für die Teambewerbung.'
	},
	{
		name: 'hilfe',
		description: 'Sendet dir Hilfe.'
	},

]

//Slash Commands an den Bot / Discord senden

const rest = new REST({version: '9'}).setToken(token);

   (async () => {
	   try {
		   console.log("\n Slash Commands werden initialisiert...");

		   await rest.put(
			   Routes.applicationGuildCommands(clientId, "SERVERID"),
			   { body: commands },
		   );

		   console.log("\n Slash Commands wurden erfolgreich initialisert");
	   } catch(error) {
		   console.error(error);
	   }
   })();

   //FUNKTIONEN 
   


//Auf Slash Command antworten
client.on('interactionCreate', async interaction => {
	if(interaction.isCommand()) {
		if(interaction.commandName === 'ping') {
			//Code für den Slash Command mit dem Namen "ping"
	    interaction.deferReply();
		await wait(1000)
		await interaction.editReply("Der Ping des Bots ist: " + client.ws.ping + "ms")
		}
    if(interaction.commandName === 'frakbewerbung') {
      if(interaction.member.roles.cache.has('1021137021948932096')){
 
      interaction.deferReply();
      await wait(1000)
      await interaction.editReply('Hallo, danke dass du eine Fraktion eröffnen willst. \n Zuerst sende bitte ein Fraktions Konzept in dies Ticket. Dies sollte ein Google Docs Dokument sein. ( **https://docs.google.com** ) \n Beachte dass du für eine Gang min. 3 Leute benötigst, für ein Kartell min. 5 Leute, für ein Syndikat min. 6. Leute und für eine Mafia auch min. 6 Leute. \n Das Konzept sollte beinhalten: Geschichte, Hood, Rangliste, Regeln Innerhalb der Frak, Fraktionsfahrzeuge, Kleiderordnung, Geschäfte, Ziele und ein Schlusswort.')
    } else {
        interaction.deferReply 
        await wait(1000)
      await 
        interaction.reply('Ne sorry aber den Command kannst du erst ab <@&1021137021948932096> benutzen.')
    }}
if(interaction.commandName === 'teambewerbung') {
      if(interaction.member.roles.cache.has('1021137019583332514')){
 
      interaction.deferReply();
      await wait(1000)
      await interaction.editReply('Hallo, danke dass du dich für das Team bewerben willst. \n Bitte Sende eine ausführliche Bewerbung in form eines Google Docs Dokumentes ein falls du eine Vorlage Brauchst frage bitte nach dieser. \n Beachte, dass du mind. 10 Spielstunden haben solltest um dich für das Team zu bewerben.\n Danke für dein Interesse, die Teamleitung.')
    } else {
        interaction.deferReply 
        await wait(1000)
      await 
        interaction.reply('Ne sorry aber den Command kannst du erst ab <@&1021137019583332514> benutzen.')
    }
}
if(interaction.commandName === 'tb_vorlage') {
	if(interaction.member.roles.cache.has('1021137019583332514')){

	interaction.deferReply();
	await wait(1000)
	await interaction.editReply('```Vorlage für die Team Bewerbung: ``` \n https://media.discordapp.net/attachments/1030556779563716638/1039179994510934016/Vorlage_Teambewerbung_Fuegocity.png	')
  } else {
	  interaction.deferReply 
	  await wait(1000)
	await 
	  interaction.reply('Ne sorry aber den Command kannst du erst ab <@&1021137019583332514> benutzen.')
  }
}
        	if(interaction.commandName === 'announcement') {
			//Code für den Slash Command mit dem Namen "announcment"
  if (interaction.member.roles.cache.has('1021137019583332514')) {              
                
	let nachricht = interaction.options.getString('message');
	const channel = interaction.options.getChannel('target');

	    interaction.deferReply();
		await wait(1000)
		await interaction.editReply('Die nachricht wurde gesendet.')
		interaction.channel.send('**Es erschien eine neue Nachricht des Teams** : \n\n\n' + nachricht)
		console.log('\n Die nachricht, des Befehls **Announcement** war: "' + nachricht + '"');
		} else {
        interaction.deferReply 
        await wait(1000)
      await 
        interaction.reply('Ne sorry aber den Command kannst du erst ab <@&1021137019583332514> benutzen.')
    }}

	/////////////////////////////// Hilfe Command
	if(interaction.commandName === 'hilfe') {
		//Code für den Slash Command mit dem Namen "hilfe"
	interaction.deferReply();
	await wait(1000)
	await interaction.editReply('Der Bot hat folgende Commands: \n /frakbewerbung - Ausschließlich für die Fraktionsverwaltung, sendet alle Infos zu Fraktions Bewerbung. \n /teambewerbung - Ausschließlich für die Teamleitung, sendet alle Infos zu Team Bewerbung. \n /tb_vorlage - Ausschließlich für die Teamleitung, sendet die Vorlage für die Team-Bewerbung. \n /ping - Gibt dir die aktuelle Latenz des Bots aus. \n /announcement - Ausschließlich für das Highteam, sendet eine Nachricht in einen selbst definierbaren Channel.')
	
	}


	}

})

//CODE


client.login(token)

	
