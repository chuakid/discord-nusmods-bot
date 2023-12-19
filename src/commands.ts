import { Embed, EmbedBuilder, SlashCommandBuilder, hyperlink } from "discord.js";
import { getModuleWithCode } from "./nusmodsapi";
import { Module } from "./types/modules";

export const commands: Record<string, { data: any, execute: (interaction: any) => void }> = {
    "getmodule": {
        data: new SlashCommandBuilder()
            .setName('getmodule')
            .setDescription('Get module info')
            .addStringOption((option =>
                option.setName("modulecode")
                    .setDescription("Module code to search for")
                    .setRequired(true))),
                    
        async execute(interaction: any) {
            const res = await getModuleWithCode(interaction.options.get("modulecode")?.value as string)

            if (res.status == 404) interaction.reply("Module not found")

            else {
                const module = await res.json() as Module
                const sem1 = module.semesterData.find(sem => sem.semester == 1)
                const sem2 = module.semesterData.find(sem => sem.semester == 2)
                const ST1 = module.semesterData.find(sem => sem.semester == 3)
                const ST2 = module.semesterData.find(sem => sem.semester == 4)
                const reply = new EmbedBuilder()
                    .setTitle(module.moduleCode + " " + module.title)
                    .setURL('https://nusmods.com/courses/' + module.moduleCode)
                    .setDescription(module.description!)
                    .addFields(
                        { name: "Semester 1", value: sem1 ? "Yes" : "No", inline: true },
                        { name: "Semester 2", value: sem2 ? "Yes" : "No", inline: true },
                        { name: "Special Term 1", value: ST1 ? "Yes" : "No", inline: true },
                        { name: "Special Term 2", value: ST2 ? "Yes" : "No", inline: true },
                    )
                    .addFields({ name: "Prerequisites", value: module.prerequisite ?? "None" })
                    .addFields({ name: "Workload", value: module.workload ? module.workload.toString() : "" })

                interaction.reply({ embeds: [reply] })
            }
        }
    }
};