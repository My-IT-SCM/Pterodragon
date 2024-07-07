import { BaseCommand } from "@/types/command";
import { EmbedBuilder } from "discord.js";

const ping: BaseCommand = {
  name: "help",
  description: "See available commands",
  enabled: true,
  async run(interaction, client) {
    const commands = await client.commandHandler.getAll();
    const pageLength: number = 5;
    const pages: number = Math.ceil(commands.length / 5);

    const embeds = Array.from({ length: pages }, (_, i) => {
      const start = i * 5;
      const current = commands.slice(start, start + 5);

      return new EmbedBuilder()
        .setTitle("Pterodragon Commands")
        .setDescription(current.map((cmd) => `**${cmd.name}** - ${cmd.description}`).join("\n"));
    });

    interaction.reply("Pong!");
  },
};

export default ping;
