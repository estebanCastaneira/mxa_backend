const { Model, DataTypes } = require("sequelize");

class Staff extends Model {
  static initModel(sequelize) {
    Staff.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        firstname: {
          type: DataTypes.STRING,
        },
        lastname: {
          type: DataTypes.STRING,
        },
        email: {
          type: DataTypes.STRING,
        },
        position_es: {
          type: DataTypes.STRING,
        },
        position_en: {
          type: DataTypes.STRING,
        },
        image: {
          type: DataTypes.STRING,
        },
        description_es: {
          type: DataTypes.STRING,
        },
        description_en: {
          type: DataTypes.STRING,
        },
        linkedin: {
          type: DataTypes.STRING,
          defaultValue:
            "https://www.linkedin.com/company/mxa-capital-tax-investment-boutique/about/",
        },
      },
      { sequelize, modelName: "staff", timestamps: true }
    );

    return Staff;
  }
}

module.exports = Staff;
