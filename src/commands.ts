import { SlashCommandBuilder, hyperlink } from "discord.js";
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

                const reply =
                    `${hyperlink(module.moduleCode + " " + module.title, 'https://nusmods.com/courses/' + module.moduleCode)}`
                    + `\n${module.faculty},${module.department}`
                    + `\n${module.description}`
                    + `\n\nSemester 1: ${sem1 ? "Yes" : "No"}`
                    + `\nSemester 2: ${sem2 ? "Yes" : "No"}`
                    + `\nSpecial Term 1: ${ST1 ? "Yes" : "No"}`
                    + `\nSpecial Term 2: ${ST2 ? "Yes" : "No"}`
                    + `\n\nPrerequisites: ${module.prerequisite ?? "None"}`
                    + `\nWorkload: ${module.workload}`
                interaction.reply(reply)
            }
        }
    }
};