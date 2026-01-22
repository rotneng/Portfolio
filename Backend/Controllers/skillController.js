const Skill = require('../Models/Skill');

exports.getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createSkill = async (req, res) => {
  try {
    const { name, percentage, category, group } = req.body;

    const newSkill = new Skill({
      name,
      percentage: percentage || 50, 
      category: category || "Tech", 
      group: group || "Core"       
    });

    await newSkill.save();
    res.json(newSkill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteSkill = async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ msg: "Skill Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};