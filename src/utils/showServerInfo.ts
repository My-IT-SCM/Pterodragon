import { EmbedBuilder } from "discord.js";
import { userRequest } from "./requests";
import fs from "fs";
interface Props {
  apiKey: string;
  serverId: string;
}

const showServerInfo = async function ({ apiKey, serverId }: Props) {
  const server = await userRequest({
    endpoint: `/api/client/servers/${serverId}`,
    key: apiKey,
  }).then((res) => {
    if (res?.attributes) return res.attributes;
  });
  await fs.writeFileSync(
    "./cache.json",
    JSON.stringify(2, null, server),
    "utf-8"
  );
  return console.log(server);
  const embed = new EmbedBuilder()
    .setTitle(server.name)
    .setDescription(server.description)
    .addFields([
      { name: "EGG", value: "" },
      { name: "SERVER ID", value: serverId },
    ])
    .addFields([
      { name: "CPU", value: server.limits.cpu || "Unlimited" },
      { name: "MEMORY", value: server.limits.memory || "Unlimited" },
      { name: "DISK", value: server.limits.disk || "Unlimited" },
      {
        name: "ALLOCATIONS",
        value: server.feature_limits.allocations || "Unlimited",
      },
      { name: "BACKUPS", value: server.feature_limits.backups || "Unlimited" },
      {
        name: "DATABASEs",
        value: server.feature_limits.databases || "Unlimited",
      },
    ]);
};

export default showServerInfo;
