require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const reportRoutes = require("./routes/reportsRoutes"); // Import report routes

const migrateAdminUser = require("./migration/migrateAdminUser");
const fs = require("fs");
const https = require("https");

const app = express();
const options = {
  key: fs.readFileSync("../SSL/private.key"),
  cert: fs.readFileSync("../SSL/certificate.pem"),
};
const port = process.env.PORT || 3001;

const server = https.createServer(options, app);

app.use(cors());

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "static")));
app.use(
  "/uploads/Images",
  express.static(path.join(__dirname, "uploads/Images"))
);
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/reports", reportRoutes); // Register report routes

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../FrontEnd/dist")));

// Catch-all handler to return the React app for any route not handled by API
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../FrontEnd/dist", "index.html"));
});

// Connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    // Call your migration function here
    await migrateAdminUser();
    // Listening to requests
    app.listen(port, "0.0.0.0", () => {
      console.log(`Connected to DB && listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
