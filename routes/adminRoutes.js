const express = require("express");
const router = express.Router();
const checkJwt = require("../middlewares/checkJwt");
const adminController = require("../controllers/adminController");

router.get("/", checkJwt, adminController.index);
router.post("/", checkJwt, adminController.store);
router.patch("/:id", checkJwt, adminController.update);
router.delete("/:id", checkJwt, adminController.destroy);

router.post("/login", adminController.login);
router.get("/logout", adminController.logout);
router.post("/reset-password", adminController.resetPassword);

module.exports = router;
