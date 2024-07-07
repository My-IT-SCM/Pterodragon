import { Interaction } from "discord.js";
import type Pterodragon from "../Pterodragon";

export default async function onInteractionCreate(interaction: Interaction, client: Pterodragon) {
    if(interaction.isCommand()){
        const commandName = interaction.commandName;
        const command = client.commandHandler.get(commandName);
        if(!command) return;
        await command.run(interaction, client);
    }
}