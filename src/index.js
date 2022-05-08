const { Client, Intents } = require("discord.js");

const { createNotionPage } = require("./notion");

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === "create") {
    interaction.reply("wait");
    const url = await createNotionPage({
      title: interaction.options.getString("title"),

      content: interaction.options.getString("content"),
    });
    await interaction.channel.send(url);
  }
});

client.login(process.env.CLIENT_TOKEN);
