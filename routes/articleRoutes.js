const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const checkJwt = require("../middlewares/checkJwt");

router.get("/", articleController.index);
router.get("/:id", articleController.show);
router.post("/", checkJwt, articleController.store);
router.patch("/:id", checkJwt, articleController.update);
router.delete("/:id",checkJwt, articleController.destroy);

module.exports = router;