import fs from "fs";
import Pterodragon from "../Pterodragon";
import { Collection } from "discord.js";
import { BaseCommand } from "@/types/command";

class CommandHandler {
  private client: Pterodragon;
  private commands: Collection<string, BaseCommand>;
  categories: string[];

  constructor(client: Pterodragon) {
    this.client = client;
    this.categories = fs.readdirSync("./src/commands");
    this.commands = new Collection();
  }

  async loadAll(): Promise<void> {
    for (const category of this.categories) {
      const files = fs.readdirSync(`./src/commands/${category}`);
      if (!files || files.length === 0) continue;
      for (const file of files) {
        const cmd = (await import(`@commands/${category}/${file}`)).default as BaseCommand;
        if(!cmd.enabled) continue;

        this.commands.set(cmd.command.name, {
          ...cmd,
          category: category,
        });
      }
    }
  }

  get(commandName: string): BaseCommand | undefined {
    return this.commands.get(commandName);
  }

  async getAll() {
    return this.commands.map((cmd) => cmd);
  }
}

export default CommandHandler;
