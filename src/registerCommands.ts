import { REST, Routes, } from 'discord.js';
import { commands } from './commands';

export const registerCommands = async () => {
    if (!process.env.TOKEN) throw "TOKEN NOT SET"
    if (!process.env.CLIENT_ID) throw "CLIENT_ID NOT SET"

    const rest = new REST().setToken(process.env.TOKEN)

    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: Object.values(commands).map(command => command.data.toJSON()) });
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }

}