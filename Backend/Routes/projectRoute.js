const express = require("express");
const router = express.Router();
const {
  getProjects,
  createProject,
  deleteProject,
} = require("../Controllers/projectController");

const auth = require("../middleware/auth");

const parser = require("../config/cloudinary");

router.get("/", getProjects);

router.post("/", auth, parser.single("image"), createProject);

router.delete("/:id", auth, deleteProject);

module.exports = router;
