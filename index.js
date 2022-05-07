const { Client, Intents } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { createNotionPage } = require("./notion");
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === "create") {
    const url = await createNotionPage({
      title: interaction.options.getString("title"),
      icon: interaction.options.getString("icon"),
      content: interaction.options.getString("content"),
    });
    await interaction.reply(url);
  }
});

client.login("OTcyNDkzMzEzNzQxNTYxODg2.YnZ2-g.-BgPuSPdWD4KWJYPdaDPOuGsTJY");
