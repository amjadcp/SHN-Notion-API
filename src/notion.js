const { markdownToBlocks } = require("@tryfabric/martian");

const { Client } = require("@notionhq/client");

require("dotenv").config();

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const createNotionPage = async ({ title, content }) => {
  const options = { allowUnsupportedObjectType: false, strictImageUrls: true };
  try {
    const response = await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_DATABASE_ID,
      },

      // icon: {
      //   type: "emoji",
      //   emoji: icon,
      // },
      properties: {
        Title: {
          title: [
            {
              text: {
                content: title,
              },
            },
          ],
        },
      },
      children: markdownToBlocks(`${content}`, options),
    });
    return response.url;
  } catch (error) {
    return false;
  }
};

module.exports = { createNotionPage };
