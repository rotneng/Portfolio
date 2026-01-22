const express = require("express");
const router = express.Router();
const {
  getSkills,
  createSkill,
  deleteSkill,
} = require("../Controllers/skillController");

const auth = require("../middleware/auth");

router.get("/", getSkills);

router.post("/", auth, createSkill);

router.delete("/:id", auth, deleteSkill);

module.exports = router;
