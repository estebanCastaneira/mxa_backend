const adminRoutes = require("./adminRoutes");
const articleRoutes = require("./articleRoutes");
const staffRoutes = require("./staffRoutes");
const imageRoutes = require("./imageRoutes");

module.exports = (app) => {
  app.use("/admin", adminRoutes);
  app.use("/articulos", articleRoutes);
  app.use("/equipo", staffRoutes);
  app.use("/public/img", imageRoutes);
};
