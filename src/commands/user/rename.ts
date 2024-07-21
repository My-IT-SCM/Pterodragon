import { BaseCommand } from "@/types/command";
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { UserTable } from "@drizzle/schema";
import { eq } from "drizzle-orm";

const command = new SlashCommandBuilder()
  .setName("rename")
  .setDescription("Rename a server")
  .addStringOption((opt) =>
    opt
      .setName("search")
      .setDescription("Search for a server")
      .setRequired(true)
  )
  .addStringOption((opt) =>
    opt
      .setName("name")
      .setDescription("New name for the server")
      .setRequired(true)
  )
  .addStringOption((opt) =>
    opt
      .setName("search_by")
      .setDescription("Specify search")
      .addChoices({ name: "Search by name", value: "search_by_name" })
      .addChoices({ name: "Search by id", value: "search_by_id" })
      .addChoices({ name: "Search by UUID", value: "search_by_uuid" })
      .addChoices({
        name: "Search by External Identifier",
        value: "search_by_eid",
      })
  );

const rename: BaseCommand = {
  command: command,
  enabled: true,
  async run(interaction, client) {
    const userId = interaction.user.id;
    const database = client.DBM.db;
    if (!database) return;
    const token = await database
      .select()
      .from(UserTable)
      .where(eq(UserTable.id, userId))
      .limit(1);
    console.log(token);
    const search = interaction.options.get("search");
    const name = interaction.options.get("name");
    const searchBy = interaction.options.get("search_by");

  },
};

export default rename;
