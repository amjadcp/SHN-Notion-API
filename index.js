const { Client } = require("@notionhq/client");

require("dotenv").config();

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

(async () => {
  const myPage = await notion.databases.query({
    database_id: "2beabde0c63f435aaf163d55f57654ee",
  });
  console.log(
    myPage.results.forEach((element) => {
      console.log(element);
    })
  );
})();

function fromNotionObject(notionPage) {
  const propertiesById = notionPropertiesById(notionPage.properties);

  return {
    id: notionPage.id,
    title: propertiesById[process.env.NOTION_TITLE_ID].title[0].plain_text,
    votes: propertiesById[process.env.NOTION_VOTES_ID].number,
    tags: propertiesById[process.env.NOTION_TAGS_ID].multi_select.map(
      (option) => {
        return { id: option.id, name: option.name };
      }
    ),
    isProject: propertiesById[process.env.NOTION_PROJECT_ID].checkbox,
    description:
      propertiesById[process.env.NOTION_DESCRIPTION_ID].rich_text[0].text
        .content,
  };
}
