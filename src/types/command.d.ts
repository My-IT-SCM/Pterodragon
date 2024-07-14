import type {
  CommandInteraction,
  ApplicationCommandData,
  SlashCommandBuilder,
  ChatInputApplicationCommandData
} from "discord.js";
import Pterodragon from "../Pterodragon";

interface BaseCommand {
  command: SlashCommandBuilder | ApplicationCommandData<ChatInputApplicationCommandData>;
  enabled: boolean;
  timeout?: number;
  usage?: string;
  category?: string;
  run(
    interaction: CommandInteraction,
    client: Pterodragon
  ): Promise<void>;
};

type BaseCommand = BaseCommand;