const { faker } = require("@faker-js/faker");
const { Admin } = require("../models");
const bcrypt = require("bcrypt");
faker.locale = "es";

module.exports = async () => {
  const admins = [];

  for (let i = 0; i < 1; i++) {
    admins.push({
      firstname: "Admin",
      lastname: "Admin",
      email: "mxa@mxa.com.uy",
      password: await bcrypt.hash("123", 10),
      role: 400,
    });
  }

  await Admin.bulkCreate(admins);
  console.log("[Database] Se corrió el seeder de Admins.");
};
