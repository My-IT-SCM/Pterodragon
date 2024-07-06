import { Client, PresenceStatusData } from "discord.js";
import config from "@/config.json";
import Pterodragon from "../Pterodragon";

export default async function onReady(bot: Client, client: Pterodragon) {
    console.log(`Logged in as ${bot.user?.username}`);
}