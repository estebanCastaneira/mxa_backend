const express = require("express");
const router = express.Router();
const imageController = require("../controllers/imageController");

router.get("/:folder/:image", imageController.show);

module.exports = router;
