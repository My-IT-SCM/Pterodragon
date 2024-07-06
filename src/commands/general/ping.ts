import { BaseCommand } from "@/types/command";

const ping: BaseCommand = {
  name: "ping",
  description: "Ping!",
  enabled: true,
  async run(interaction) {
    interaction.reply("Pong!");
  },
};

export default ping;
