const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  percentage: { type: Number, required: true },

  category: { type: String, required: true },

  group: {
    type: String,
    enum: ["Core", "Specialized", "Other"],
    default: "Core",
  },

  icon: { type: String },
});

module.exports = mongoose.model("Skill", skillSchema);
