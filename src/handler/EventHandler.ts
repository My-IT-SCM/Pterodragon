import { onInteractionCreate, onReady } from "../events/index";
import Pterodragon from "../Pterodragon";

class EventHandler {
  private client: Pterodragon;
  
  constructor(client: Pterodragon) {
    this.client = client;
  }
  async loadAll() {
    const client = this.client;
    client.on("ready", async (bot) => {
        await onReady(bot, client);
    });

    client.on("interactionCreate", async (interaction) => {
        await onInteractionCreate(interaction, client);
    })
  }
}

export default EventHandler;