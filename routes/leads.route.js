const express = require("express");
const router = express.Router();
const Lead = require("../models/leads.model");
const sendEmail = require("../utils/sendEmail");

// 📩 Create a new lead
router.post("/submit", async (req, res) => {
  const { name, email, phone, requirements, budget, message } = req.body;

  try {
    // ✅ Save lead to DB
    const newLead = new Lead({
      name,
      email,
      phone,
      requirements,
      budget,
      message,
    });
    await newLead.save();

    // 📨 Notify admin
    // await sendEmail({
    //   to: "accounts@bigwigmedia.in",
    //   subject: "New Lead Submission - Bigwig Media",
    //   html: `
    //     <h3>New Lead Details</h3>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email || "N/A"}</p>
    //     <p><strong>Phone:</strong> ${phone}</p>
    //     <p><strong>Requirements:</strong> ${requirements}</p>
    //     <p><strong>Budget:</strong> ${budget}</p>
    //     <p><strong>Message:</strong> ${message}</p>
    //   `,
    // });

    // 📬 Send confirmation to user (if email exists)
    if (email) {
      await sendEmail({
        to: email,
        subject: "We've received your query - Bigwig Media",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
            <div style="text-align: center; padding: 20px;">
              <img src="https://res.cloudinary.com/dqrlkbsdq/image/upload/v1755090981/logo_bohujn.png" alt="Bigwig Media" width="120" />
            </div>
            <div style="padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
              <h2 style="color: #333;">Hello ${name},</h2>
              <p style="font-size: 16px; color: #555;">
                Thank you for reaching out to <strong>Bigwig Media</strong>.
                Our team will get in touch with you soon.
              </p>
              <p style="margin-top: 30px; font-size: 15px; color: #777;">
                Regards,<br />
                <strong>Team Bigwig Media</strong>
              </p>
            </div>
          </div>
        `,
      });
    }

    res.status(200).json({ message: "Lead submitted successfully." });
  } catch (err) {
    console.error("Error saving lead:", err);
    res.status(500).json({ message: "Server error while saving lead." });
  }
});

// 📄 Fetch all leads
router.get("/all", async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.status(200).json(leads);
  } catch (err) {
    console.error("Error fetching leads:", err);
    res.status(500).json({ message: "Server error while fetching leads." });
  }
});

module.exports = router;
