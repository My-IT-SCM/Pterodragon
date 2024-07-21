import { BaseCommand } from "@/types/command";
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { UserTable } from "@drizzle/schema";

const command = new SlashCommandBuilder()
  .setName("rename")
  .setDescription("Rename a server")
  .addSubcommand((sub) =>
    sub
      .setName("searchByName")
      .setDescription("Search a server by name")
      .addStringOption((opt) =>
        opt.setName("name").setDescription("Server name")
      )
  )
  .addSubcommand((sub) =>
    sub
      .setName("searchById")
      .setDescription("Search a server by ID")
      .addStringOption((opt) => opt.setName("id").setDescription("Server ID"))
  )
  .addSubcommand((sub) =>
    sub
      .setName("searchByUUID")
      .setDescription("Search a server by UUID")
      .addStringOption((opt) =>
        opt.setName("uuid").setDescription("Server UUID")
      )
  )
  .addSubcommand((sub) =>
    sub
      .setName("searchByEID")
      .setDescription("Search a server by External Identifier")
      .addStringOption((opt) =>
        opt.setName("eid").setDescription("Server External Identifier")
      )
  );
const rename: BaseCommand = {
  command: command,
  enabled: true,
  async run(interaction, client) {
    
  },
};

export default rename;