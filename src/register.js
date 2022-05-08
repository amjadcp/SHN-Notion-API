const { REST } = require("@discordjs/rest");

const { Routes } = require("discord-api-types/v9");

require("dotenv").config();

const commands = [
  {
    name: "create",
    type: 1,
    description: "create a notion page!",
    options: [
      {
        name: "icon",
        description: "The icon for the notion page",
        type: 3,
        required: true,
        options: ["😀", "😃", "😄", "😁", "😆"],
      },
      {
        name: "title",
        description: "The title for the notion page",
        type: 3,
        required: true,
      },
      {
        name: "content",
        description: "Page content",
        type: 3,
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: "9" }).setToken(process.env.CLIENT_TOKEN);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");
    await rest.put(
      Routes.applicationGuildCommands(process.env.APP_ID, process.env.GUILD_ID),
      {
        body: commands,
      }
    );

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
