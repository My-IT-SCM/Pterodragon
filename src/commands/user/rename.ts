import { BaseCommand } from "@/types/command";
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { UserTable } from "@drizzle/schema";
import { eq } from "drizzle-orm";
import { userRequest } from "@utils/requests";

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
      .addChoices({ name: "Search by Server Name", value: "search_by_name" })
      .addChoices({ name: "Search by Server ID", value: "search_by_id" })
      .addChoices({ name: "Search by Server UUID", value: "search_by_uuid" })
      .addChoices({
        name: "Search by External ID",
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
    const credentails = await database
      .select()
      .from(UserTable)
      .where(eq(UserTable.id, userId));

    const search = interaction.options.get("search")?.value as string;
    const name = interaction.options.get("name")?.value as string;
    const searchBy = interaction.options.get("search_by")?.value;
    const res = await userRequest({
      endpoint: "/api/client",
      key: credentails[0].token as string,
    });

    const server = res.data.filter((server) => {
      if (searchBy === "search_by_name") {
        return server.attributes.name === search;
      } else if (searchBy === "search_by_id") {
        return server.attributes.id === search;
      } else if (searchBy === "search_by_uuid") {
        return server.attributes.uuid === search;
      } else if (searchBy === "search_by_eid") {
        return server.attributes.external_id === search;
      } else {
        return (
          server.attributes.name === search ||
          server.attributes.id === search ||
          server.attributes.uuid === search ||
          server.attributes.external_id === search
        );
      }
    });

    if (!server[0]) return await interaction.reply("Server not found");

    await userRequest({
      endpoint: `/api/client/servers/${server[0].attributes.identifier}/settings/rename`,
      key: credentails[0].token as string,
      method: "POST",
      data: JSON.stringify({
        name: name,
      }),
    })
      .then(async (res) => {
        await interaction.reply("Server renamed");
      })
      .catch((err) => {
        console.error(err);
      });
  },
};

export default rename;
