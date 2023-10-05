const { Model, DataTypes } = require("sequelize");

class Article extends Model {
  static initModel(sequelize) {
    Article.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        title_es: {
          type: DataTypes.STRING,
        },
        title_en: {
          type: DataTypes.STRING,
        },
        author: {
          type: DataTypes.STRING,
          defaultValue: "MXA",
        },
        content_es: {
          type: DataTypes.TEXT,
        },
        content_en: {
          type: DataTypes.TEXT,
        },
        image: {
          type: DataTypes.STRING,
        },
      },
      { sequelize, modelName: "article", timestamps: true }
    );
    return Article;
  }
}

module.exports = Article;
