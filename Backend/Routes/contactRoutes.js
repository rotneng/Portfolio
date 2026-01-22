const express = require("express");
const router = express.Router();
const { submitContact } = require("../Controllers/contactController");

router.post("/", submitContact);

module.exports = router;
