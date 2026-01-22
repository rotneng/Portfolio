const express = require("express");
const router = express.Router();
const {
  getProjects,
  createProject,
  deleteProject,
} = require("../Controllers/projectController");

const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

router.get("/", getProjects);

router.post("/", auth, upload.single("imageFile"), createProject);

router.delete("/:id", auth, deleteProject);

module.exports = router;
