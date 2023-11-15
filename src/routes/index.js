const homeRouter = require("../routes/home.router.js");
const ggdriveRouter = require("../routes/ggdrive.router.js");

const route = (app) => {
  app.use("/upload", ggdriveRouter);
  app.use("/", homeRouter);
};

module.exports = route;
