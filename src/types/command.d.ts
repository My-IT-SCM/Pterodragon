import type {
  CommandInteraction,
  ApplicationCommandData,
  SlashCommandBuilder
} from "discord.js";
import Pterodragon from "../Pterodragon";

interface BaseCommand {
  command: SlashCommandBuilder | ApplicationCommandData;
  enabled: boolean;
  timeout?: number;
  usage?: string;
  run(
    interaction: CommandInteraction,
    client: Pterodragon
  ): Promise<void>;
};

type BaseCommand = BaseCommand;