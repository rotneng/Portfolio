const Project = require("../Models/Project");

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      techStack,
      githubLink,
      liveLink,
      isFeatured,
    } = req.body;

    const techStackArray = techStack
      ? techStack.split(",").map((t) => t.trim())
      : [];

    let finalImage = "";

    if (req.file) {
      finalImage = req.file.path;
    } else if (req.body.image) {
      finalImage = req.body.image;
    }

    const newProject = new Project({
      title,
      description,
      category: category || "Web Apps",
      techStack: techStackArray,
      image: finalImage,
      githubLink,
      liveLink,
      isFeatured: isFeatured === "true",
      stats: {
        rating: 5,
        downloads: "100+",
        activeUsers: "50+",
      },
    });

    await newProject.save();
    res.json(newProject);
  } catch (err) {
    console.error("Error creating project:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ msg: "Project Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
