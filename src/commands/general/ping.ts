import { BaseCommand } from "@/types/command";
import { SlashCommandBuilder } from "discord.js";

const command = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Ping!");


const ping: BaseCommand = {
  command: command,
  enabled: true,
  async run(interaction) {
    interaction.reply("Pong!");
  },
};

export default ping;
