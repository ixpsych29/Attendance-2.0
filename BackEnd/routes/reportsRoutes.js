const express = require("express");
const {
  getUnpaidLeavesReport,
  getMonthlyAttendanceReportByUser,
  getMonthlyAttendanceReport,
  getLateComingReport,
  getLeaveCountReport,
  getRemainingLeavesReport,
} = require("../controllers/reportsController");

const router = express.Router();

// Report routes
router.get("/unpaid-leaves", getUnpaidLeavesReport);
router.get("/monthly-attendance-by-user", getMonthlyAttendanceReportByUser);
router.get("/monthly-attendance", getMonthlyAttendanceReport);
router.get("/late-coming", getLateComingReport);
router.get("/leave-count", getLeaveCountReport);
router.get("/remaining-leaves", getRemainingLeavesReport);

module.exports = router;
