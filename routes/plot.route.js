const express = require("express");
const router = express.Router();
const {
  createLead,
  deleteLead,
  getLeadById,
  getAllLeads,
} = require("../controllers/plotController");

// POST - Create Lead
router.post("/create", createLead);

router.get("/all", getAllLeads);

router.get("/:id", getLeadById);

router.delete("/:id", deleteLead);
module.exports = router;
