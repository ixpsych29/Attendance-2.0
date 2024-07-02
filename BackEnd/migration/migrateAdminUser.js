const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

// Define the migration function
const migrateAdminUser = async () => {
  try {
    // Find if an admin user exists
    const adminUser = await User.findOne({ role: "admin" });

    // If no admin user found, create one
    if (!adminUser) {
      const hashedPassword = await bcrypt.hash("!S@ndyAPP$8080", 10);

      const newAdminUser = new User({
        name: "Admin User",
        username: "admin",
        email: "admin@gmail.com",
        password: hashedPassword,
        role: "admin",
        status: "approved",
      });

      await newAdminUser.save();
      console.log("Admin added.");
    } else {
      console.log("Admin exists");
    }
  } catch (error) {
    console.error("Migration failed:", error);
  }
};

module.exports = migrateAdminUser;
