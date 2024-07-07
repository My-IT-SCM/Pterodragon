import type {
  CommandInteraction,
  ApplicationCommandData
} from "discord.js";
import Pterodragon from "../Pterodragon";

interface BaseCommand {
  name: string;
  enabled: boolean;
  description: string;
  nsfw?: boolean;
  timeout?: number;
  usage?: string;
  run(
    interaction: CommandInteraction,
    client: Pterodragon
  ): Promise<void>;
};

type BaseCommand = BaseCommand;