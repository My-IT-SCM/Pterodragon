import { BaseCommand } from "@/types/command";
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { UserTable } from "@drizzle/schema";
import { eq } from "drizzle-orm";
import { userRequest } from "@utils/requests";
import showServerInfo from "@utils/showServerInfo";

const command = new SlashCommandBuilder()
  .setName("servers")
  .setDescription("Show and manage your server")
  .addStringOption((opt) =>
    opt
      .setName("search")
      .setDescription("Search for a server")
      .setRequired(false)
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

const servers: BaseCommand = {
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
    const searchBy = interaction.options.get("search_by")?.value;
    const res: { data: ServerDetails[] } = await userRequest({
      endpoint: "/api/client",
      key: credentails[0].token as string,
    });

    if (!res.data.length) return await interaction.reply("No servers found");

    const server = res.data.filter((server) => {
      if (searchBy === "search_by_name") {
        return server.attributes.name === search;
      } else if (searchBy === "search_by_id") {
        return server.attributes.identifier === search;
      } else if (searchBy === "search_by_uuid") {
        return server.attributes.uuid === search;
      } else {
        return (
          server.attributes.name === search ||
          server.attributes.identifier === search ||
          server.attributes.uuid === search
        );
      }
    });

    if (!server[0]) return await interaction.reply("Server not found");
    await interaction.reply("Developing....")
    return showServerInfo({
      serverId: search,
      apiKey: credentails[0].token as string,
    });

    if (search) {
    } else {
    }

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

export default servers;
