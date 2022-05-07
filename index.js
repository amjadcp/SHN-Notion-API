const { AsciiTable3, AlignmentEnum } = require("ascii-table3");
require("dotenv").config(); //initialize dotenv
const { Client, Intents } = require("discord.js"); //import discord.js
const NOTION = require("@notionhq/client");

const createPlanInNotion = async ({ name, date, description, mentor }) => {
  const response = await notion.pages.create({
    parent: {
      database_id: "2beabde0c63f435aaf163d55f57654ee",
    },
    icon: {
      type: "emoji",
      emoji: "🥬",
    },
    cover: {
      type: "external",
      external: {
        url: "https://upload.wikimedia.org/wikipedia/commons/6/62/Tuscankale.jpg",
      },
    },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: name,
            },
          },
        ],
      },
      "Planned Date": {
        date: {
          start: "2021-05-11T11:00:00.000-04:00",
        },
      },
      Status: {
        select: {
          name: "Pending",
        },
      },
      Description: {
        rich_text: [
          {
            text: {
              content: description,
            },
          },
        ],
      },
      Mentor: {
        rich_text: [
          {
            text: {
              content: mentor,
            },
          },
        ],
      },

      // Price: {
      //   number: 2.5,
      // },
    },
    children: [],
  });
  console.log("Done");
};

const getData = (notionPage) => {
  return notionPage.results.map((e) => {
    return {
      name: e.properties.Name.title[0].plain_text,
      tasksCompleted: e.properties.Status.multi_select.map((e) => e.name),
    };
  });
};
const notion = new NOTION.Client({
  auth: process.env.NOTION_TOKEN,
});

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
}); //create new client

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async (msg) => {
  if (msg.mentions.has(client.user)) {
    console.log('qqqq');
    const [rest, name, description, mentor] = msg.content.split(" ");
    await createPlanInNotion({
      name: name,
      description: description,
      mentor: mentor,
    });
  }
  // if (msg.content === "ping") {
  //   msg.reply("Pong!");
  // } else if (msg.content === "/rank") {
  //   const myPage = await notion.databases.query({
  //     database_id: "2beabde0c63f435aaf163d55f57654ee",
  //   });

  //   msg.reply(JSON.stringify(getData(myPage)));
  // }
});
//make sure this line is the last line
client.login(process.env.CLIENT_TOKEN); //login bot using toke
