const mongoose = require("mongoose");

const brochureLeadSchema = new mongoose.Schema({
  name: String,

  phone: String,

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("BrochureLead", brochureLeadSchema);
