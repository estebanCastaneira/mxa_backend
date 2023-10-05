const { faker } = require("@faker-js/faker");
const { Article } = require("../models");

faker.locale = "es";

module.exports = async () => {
  const articles = [];

  for (let i = 0; i < 10; i++) {
    articles.push({
      title_es: faker.lorem.sentence(5),
      title_en: faker.lorem.sentence(5),
      content_es: faker.lorem.paragraphs(1),
      content_en: faker.lorem.paragraphs(1),
      author: `${faker.name.firstName()}  ${faker.name.lastName()}`,
      image: `article/25d19ff8231988cc0dd350a00.jpg`,
    });
  }
  await Article.bulkCreate(articles);
  console.log("[Database] Se corrió el seeder de Articles.");
};
