import { Client, PresenceStatusData } from "discord.js";
import config from "@/config.json";
import Pterodragon from "../Pterodragon";

export default async function onReady(bot: Client, client: Pterodragon) {
    console.log(`Logged in as ${bot.user?.username}`);

    process.stdin.on("data", (data) => {
        const cmd = (data.toString().trim()).split(" ")[0];
        if (cmd === "stop") {
            console.log("Shutting down...");
            bot.destroy();
            process.exit();
        }
    })
}