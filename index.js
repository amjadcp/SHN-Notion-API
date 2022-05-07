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
  // console.log(myPage.results[0].properties.Status);
  console.log(getData(myPage));
})();

const getData = (notionPage) => {
  return notionPage.results.map((e) => {
    return {
      name: e.properties.Name.title[0].plain_text,
      tasksCompleted: e.properties.Status.multi_select.map((e) => e.name),
    };
  });
};
