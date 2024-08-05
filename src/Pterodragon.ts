import { Client, GatewayIntentBits, SlashCommandBuilder } from "discord.js";
import EventHandler from "./handler/EventHandler";
import CommandHandler from "./handler/CommandHandler";
import type configs from "../config.json";
import DBManager from "./utils/database";

export default class Pterodragon extends Client {
  commandHandler: CommandHandler;
  eventHandler: EventHandler;
  config: typeof configs;
  DBM: DBManager;

  constructor(config: typeof configs) {
    super({
      intents: [
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.MessageContent,
      ],
    });
    this.commandHandler = new CommandHandler(this);
    this.commandHandler.loadAll();
    this.eventHandler = new EventHandler(this);
    this.eventHandler.loadAll();
    this.config = config;
    this.DBM = new DBManager(this);
  }

  async init() {
    console.log("Initializing...");
  }

  async start() {
    // Register Command
    await this.DBM.connect();
    // await this.DBM.migrate();
    await this.commandHandler.loadSlashCommands();
  }
}
