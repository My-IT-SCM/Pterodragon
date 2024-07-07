import {
  EmbedBuilder,
  CommandInteraction,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  CollectorFilter,
  ButtonInteraction,
  Collection,
} from "discord.js";

type options = {
  interaction: CommandInteraction;
  embeds: EmbedBuilder[];
  time?: number;
  customFilter?: (i: any) => boolean;
  fastSkip?: boolean;
  end?: boolean;
};

async function InteractionButtonPages({
  interaction,
  embeds,
  time,
  customFilter,
  fastSkip,
  end,
}: options) {
  const defaultEmojis: { [key: string]: string } = {
    first: "🏠",
    previous: "◀️",
    next: "▶️",
    last: "➡️",
    end: "❌",
  };
  const defaultStyles: { [key: string]: "Success" | "Primary" | "Danger" } = {
    first: "Success",
    previous: "Primary",
    next: "Primary",
    last: "Primary",
    end: "Danger",
  };
  let currentPage = 1;
  const generateButtons = (state?: boolean) => {
    const checkState = (name: string): boolean => {
      if (["first", "previous"].includes(name) && currentPage === 1)
        return true;
      if (["next", "last"].includes(name) && currentPage === embeds.length)
        return true;
      return false;
    };

    let names = ["previous", "next"];
    if (fastSkip) names = ["first", ...names, "last"];
    if (end) names.push("end");

    return names.reduce((accumulator: ButtonBuilder[], name) => {
      accumulator.push(
        new ButtonBuilder()
          .setEmoji(defaultEmojis[name])
          .setCustomId(name)
          .setDisabled(state || checkState(name))
          .setStyle(ButtonStyle[`${defaultStyles[name]}`])
      );
      return accumulator;
    }, []);
  };

  const components = (state?: boolean) => [
    new ActionRowBuilder<ButtonBuilder>().addComponents(generateButtons(state)),
  ];

  const changeFooter = () => {
    const newEmbed = embeds[currentPage - 1];
    // if (newEmbed.data.footer?.text) {
    //   return newEmbed.setFooter({
    //     text: `${embed.footer.text} - Page ${currentPage}/${embeds.length}`,
    //     iconURL: embed.footer.iconURL,
    //   });
    // }
    return newEmbed.setFooter({
      text: `Page ${currentPage}/${embeds.length}`,
    });
  };

  await interaction.reply({
    embeds: [changeFooter()],
    components: components(false),
  });

  const defaultFilter = async (i: ButtonInteraction) => {
    if (!i.deferred) await i.deferUpdate();
    return i.user.id === interaction.user.id;
  };

  const filter = customFilter || defaultFilter;
  let Msg = await interaction.fetchReply();
  const collector = Msg.createMessageComponentCollector({
    filter,
    componentType: 2,
    time: time,
  });

  collector.on("collect", async (i) => {
    const id = i.customId;
    if (id === "first") currentPage = 1;
    if (id === "previous") currentPage--;
    if (id === "next") currentPage++;
    if (id === "last") currentPage = embeds.length;
    if (id === "end") return await collector.stop();
    interaction.editReply({
      embeds: [changeFooter()],
      components: components(),
    });
  });

  collector.on("end", () => {
    interaction.deleteReply();
  });
}

export default InteractionButtonPages;
