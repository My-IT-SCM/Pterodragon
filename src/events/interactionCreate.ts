import { Interaction } from "discord.js";
import type Pterodragon from "../Pterodragon";

export default async function onInteractionCreate(interaction: Interaction, client: Pterodragon) {
    if(interaction.isCommand()){
        const commandName = interaction.commandName;
        const command = client.commandHandler.get(commandName);
        if(!command) return interaction.reply("Command not found");
        await command.run(interaction, client).catch((err) => {
            interaction.reply("There was an error while executing this command!").catch(() => {});
            console.log(`An error occured while executing command ${commandName}`);
            console.log(err);
        }).then(() => console.log(`${interaction.user.username} executed /${commandName}`));
    }
}