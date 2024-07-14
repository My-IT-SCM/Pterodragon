import { BaseCommand } from "@/types/command";
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

const command = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Shows latency of the bot");

const ping: BaseCommand = {
  command: command,
  enabled: true,
  async run(interaction, client) {
    await interaction
      .reply({ content: "Pinging...", fetchReply: true })
      .then(async (sent) => {
        const emebed = new EmbedBuilder()
          .setTitle("Pong!")
          .setDescription(
            `Bot Latency: ${Math.round(client.ws.ping)}ms \nAPI Latency: ${
              sent.createdTimestamp - interaction.createdTimestamp
            }ms`
          );

        await interaction.editReply({ content: "", embeds: [emebed] });
      });
  },
};

export default ping;
