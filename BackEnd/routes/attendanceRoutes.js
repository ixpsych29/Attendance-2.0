const express = require("express");
const {
  getAttendance,
  getOneAttendance,
  createAttendance,
  updateAttendance,
  getPresentOnes,
  getTodayAttendances,
  getMonthlyAttendances,
  getAttendanceReport,
  getAbsentOnes,
  getWeeklyAttendance,
  getLateComings,
} = require("../controllers/attendanceController");

const router = express.Router();

router.get("/late", getLateComings); // Add this route

router.get("/weekly/:userName", getWeeklyAttendance);

router.get("/present-users", getPresentOnes);
// router.get("/absent", getAbsentOnes);
router.get("/absent-users", getAbsentOnes);

// Get one month  report
router.get("/report", getAttendanceReport);

router.get("/all", getTodayAttendances);

//single day history
router.get("/:userName", getOneAttendance);

//insert new record to history
router.post("/", createAttendance);

//update attendance check out time
router.put("/:userName", updateAttendance);

//update attendance history
router.put("/", updateAttendance);

// Monthly attendance history for a specific user
router.get("/monthly/:userName", getMonthlyAttendances);

// Get present and absent employees

// Route to get absent employees
module.exports = router;
