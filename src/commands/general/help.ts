import { BaseCommand } from "@/types/command";

const ping: BaseCommand = {
  name: "help",
  description: "See available commands",
  enabled: true,
  async run(interaction) {
    interaction.reply("Pong!");
  },
};

export default ping;
