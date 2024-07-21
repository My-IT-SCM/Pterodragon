import { BaseCommand } from "@/types/command";
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { UserTable } from "@drizzle/schema";

const command = new SlashCommandBuilder()
  .setName("userconf")
  .setDescription("User Settings")
  .addStringOption((opt) =>
    opt.setName("token").setDescription("Pterodactyl Client API Token")
  );
const userconf: BaseCommand = {
  command: command,
  enabled: true,
  async run(interaction, client) {
    const database = client.DBM.db;
    const token = interaction.options.get("token");
    if (token && database) {
      await database
        .insert(UserTable)
        .values({
          id: interaction.user.id,
          token: token.value as string,
        })
        .onDuplicateKeyUpdate({
          set: {
            token: token.value as string,
          },
        });
      await interaction.reply({
        content: "Token has been set",
        ephemeral: true,
      });
    }
  },
};

export default userconf;
