require("dotenv").config();
const express = require("express");
const router = require("./routes");
const PORT = process.env.APP_PORT;
const cors = require("cors");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use(cors());
router(app);

app.listen(PORT, () =>
  console.log(`server running on port ${PORT} http://localhost:${PORT}`)
);
