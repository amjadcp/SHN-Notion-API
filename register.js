const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

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

const rest = new REST({ version: "9" }).setToken(
  "OTcyNDkzMzEzNzQxNTYxODg2.YnZ2-g.-BgPuSPdWD4KWJYPdaDPOuGsTJY"
);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");
    await rest.put(
      Routes.applicationGuildCommands(
        "972493313741561886",
        "868543226024439879"
      ),
      {
        body: commands,
      }
    );

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
