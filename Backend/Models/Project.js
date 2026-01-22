const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, default: "Web Apps" },

    techStack: [String],

    stats: {
      rating: { type: Number, default: 0 },
      downloads: { type: String, default: "0" },
      activeUsers: { type: String, default: "0" },
    },

    image: { type: String, required: false },
    githubLink: { type: String },
    liveLink: { type: String },

    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Project", projectSchema);
