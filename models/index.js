const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_CONNECTION,
    logging: false,
  }
);

const Admin = require("./Admin");
const Staff = require("./Staff");
const Article = require("./Article");

Admin.initModel(sequelize);
Staff.initModel(sequelize);
Article.initModel(sequelize);

module.exports = {
  sequelize,
  Admin,
  Staff,
  Article,
};
