import { BaseCommand } from "@/types/command";
import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import InteractionButtonPages from "@utils/InteractionButtonPage";
const command = new SlashCommandBuilder()
  .setName("help")
  .setDescription("Shows all the commands");

const ping: BaseCommand = {
  command: command,
  enabled: true,
  async run(interaction, client) {
    const commands = await client.commandHandler.getAll();
    const pageLength: number = 5;
    const pages: number = Math.ceil(commands.length / pageLength);

    const embeds = Array.from({ length: pages }, (_, i) => {
      const start = i * pageLength;
      const current = commands.slice(start, start + pageLength);

      return new EmbedBuilder()
        .setTitle(`Pterodragon Commands`)
        .setDescription(
          current
            .map(
              (cmd) => `**${cmd.command.name}** - ${cmd.command.description}`
            )
            .join("\n")
        )
        .setTimestamp();
    });

    await InteractionButtonPages({
      embeds: embeds,
      interaction: interaction,
      time: 60000,
      end: false,
      fastSkip: false,
    });
  },
};

export default ping;
