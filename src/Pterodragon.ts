import { Client, GatewayIntentBits, Collection } from "discord.js";
import EventHandler from "./handler/EventHandler";
import CommandHandler from "./handler/CommandHandler";

export default class Pterodragon extends Client {
  commandHandler: CommandHandler;
  eventHandler: EventHandler;

  constructor() {
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
  }

  async init() {}

  async start() {}
}
