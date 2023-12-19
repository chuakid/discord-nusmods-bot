import 'dotenv/config'
import { Client, Events, GatewayIntentBits } from 'discord.js';
import { registerCommands } from './registerCommands';
import { commands } from './commands';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
//register commands
registerCommands()

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return
    if (commands[interaction.commandName]) {
        commands[interaction.commandName].execute(interaction)
    } else {
        interaction.reply({ content: "Command failed!", ephemeral: true })
    }
})

if (!process.env.TOKEN) throw "Token not found"
// Log in to Discord with your client's token
client.login(process.env.TOKEN);


