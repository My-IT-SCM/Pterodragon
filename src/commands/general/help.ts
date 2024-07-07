import { BaseCommand } from "@/types/command";
import { EmbedBuilder } from "discord.js";
import InteractionButtonPages from "@utils/InteractionButtonPage";

const ping: BaseCommand = {
  name: "help",
  description: "See available commands",
  enabled: true,
  async run(interaction, client) {
    const commands = await client.commandHandler.getAll();
    const pageLength: number = 5;
    const pages: number = Math.ceil(commands.length / pageLength);

    const embeds = Array.from({ length: pages }, (_, i) => {
      const start = i * pageLength;
      const current = commands.slice(start, start + pageLength);

      return new EmbedBuilder()
        .setTitle("Pterodragon Commands")
        .setDescription(current.map((cmd) => `**${cmd.name}** - ${cmd.description}`).join("\n"));
    });

    await InteractionButtonPages({
        embeds: embeds,
        interaction: interaction,
        time: 60000,
        end: false,
        fastSkip: false
    })
  },
};

export default ping;
