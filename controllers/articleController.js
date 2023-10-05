const { Article } = require("../models");
const formidable = require("formidable");
const fs = require("fs");
// Display a listing of the resource.
async function index(req, res) {
  try {
    const articles = await Article.findAll();

    return res.json(articles);
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({
      message: "We're sorry, there was an error with your request.",
      err: `${err}`,
    });
  }
}
// Display the specified resource.
async function show(req, res) {
  try {
    const article = await Article.findByPk(req.params.id);
    return res.json(article);
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({
      message: "We're sorry, there was an error with your request.",
      err: `${err}`,
    });
  }
}
// Store a newly created resource in storage.
async function store(req, res) {
  try {
    const form = formidable({
      multiples: true,
      uploadDir: "public/img/article",
      keepExtensions: true,
    });

    const formPromise = new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          reject(err);
        } else {
          resolve({ fields, files });
        }
      });
    });

    const { fields, files } = await formPromise;

    const { title_es, title_en, author, content_es, content_en } = fields;

    const article = await Article.create({
      title_es,
      title_en,
      author,
      content_es,
      content_en,
      image: "article/" + files["image"].newFilename,
    });
    res.status(201).json({
      message: "article created successfully.",
      id: `${article.id}`,
      image: `${article.image}`,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({
      message: "We're sorry, there was an error with your request.",
      error: `${err}`,
    });
  }
}

// Update the specified resource in storage.
async function update(req, res) {
  try {
    const form = formidable({
      multiples: true,
      uploadDir: "public/img/article",
      keepExtensions: true,
    });

    const formPromise = new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          reject(err);
        } else {
          resolve({ fields, files });
        }
      });
    });

    const { fields, files } = await formPromise;

    const { title_es, title_en, author, image, content_es, content_en } =
      fields;

    const article = await Article.findByPk(req.params.id);
    if (article.image !== image) {
      fs.unlink(`public/img/${article.image}`, (error) => {
        return error;
      });
      article.image = "article/" + files["image"].newFilename;
    }
    article.title_es = title_es;
    article.title_en = title_en;
    article.author = author ? author : "MXA";
    article.content_es = content_es;
    article.content_en = content_en;
    await article.save();
    res.status(201).json({
      message: "article updated successfully.",
      id: `${article.id}`,
      image: `${article.image}`,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({
      message: "We're sorry, there was an error with your request.",
      error: `${err}`,
    });
  }
}

async function destroy(req, res) {
  try {
    const article = await Article.findByPk(req.params.id);
    if (article) {
      await new Promise((resolve, reject) => {
        fs.unlink(`public/img/${article.image}`, (error) => {
          if (error) {
            console.error("Error deleting image:", error);
            reject(error);
          } else {
            resolve();
          }
        });
      });

      await Article.destroy({
        where: { id: article.id },
      });

      return res.status(200).json({ message: "Article deleted successfully" });
    }
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({
      message: "We're sorry, there was an error with your request.",
      err: `${err}`,
    });
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
