const express = require("express");
const router = express.Router();
const staffController = require("../controllers/staffController")
const checkJwt = require("../middlewares/checkJwt");

router.get("/", staffController.index);
router.get("/:id", staffController.show);
router.post("/", checkJwt, staffController.store);
router.patch("/:id", checkJwt, staffController.update);
router.delete("/:id", checkJwt, staffController.destroy);

module.exports = router;