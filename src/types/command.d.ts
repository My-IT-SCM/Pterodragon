import type {
  CommandInteraction,
  ApplicationCommandData
} from "discord.js";

interface BaseCommand {
  name: string;
  enabled: boolean;
  description: string;
  nsfw?: boolean;
  timeout?: number;
  usage?: string;
  run(
    interaction: CommandInteraction,
  ): Promise<void>;
};

type BaseCommand = BaseCommand;