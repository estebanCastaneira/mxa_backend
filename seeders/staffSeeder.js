const { faker } = require("@faker-js/faker");
const { Staff } = require("../models");

faker.locale = "es";

module.exports = async () => {
  const staff = [];

  for (let i = 0; i < 10; i++) {
    staff.push({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      position_es: "CEO",
      position_en: "CEO",
      image: `staff/c236b71b3b30e9de9954e3200.jpg`,
      description_es: faker.lorem.sentence(10),
      description_en: faker.lorem.sentence(10),
      linkedin:
        "https://www.linkedin.com/company/mxa-capital-tax-investment-boutique/about/",
    });
  }

  await Staff.bulkCreate(staff);
  console.log("[Database] Se corrió el seeder de Staff.");
};
