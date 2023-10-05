const path = require("path");
async function show(req, res) {
  const { folder, image } = req.params;

  const filePath = path.resolve(`public/img/${folder}/${image}`);

  res.sendFile(filePath);
}

module.exports = { show };
