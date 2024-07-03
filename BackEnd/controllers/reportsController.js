const User = require("../models/userModel");
const Attendance = require("../models/attendanceModel");
const dayjs = require("dayjs");

// Utility function to calculate late comings
const getLateComings = async (startDate, endDate) => {
  const lateComings = await Attendance.find({
    entranceTime: { $gte: startDate, $lte: endDate },
    entranceTime: { $gt: new Date().setHours(12, 0, 0, 0) }, // After 12:00 PM
  });
  return lateComings;
};

// Report 1: Approved leave requests with leave type 'unpaid' in the last year
const getUnpaidLeavesReport = async (req, res) => {
  try {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const users = await User.find(
      {
        "leaveRequests.leaveType": "unpaid",
        "leaveRequests.status": "approved",
        "leaveRequests.startDate": { $gte: oneYearAgo },
      },
      {
        name: 1,
        username: 1,
        "leaveRequests.$": 1,
      }
    );

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching unpaid leaves report:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Report 2: Monthly attendance report for each employee
const getMonthlyAttendanceReportByUser = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const reportStartDate = dayjs(startDate).startOf("day");
    const reportEndDate = dayjs(endDate).endOf("day");

    const users = await User.find({ role: "user" }, { username: 1 });

    const attendanceData = await Promise.all(
      users.map(async (user) => {
        const attendances = await Attendance.find({
          username: user.username,
          entranceTime: { $gte: reportStartDate, $lte: reportEndDate },
        });
        return { username: user.username, attendances };
      })
    );

    res.status(200).json(attendanceData);
  } catch (error) {
    console.error("Error fetching monthly attendance report by user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Report 3: Monthly attendance report for all employees
const getMonthlyAttendanceReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const reportStartDate = dayjs(startDate).startOf("day");
    const reportEndDate = dayjs(endDate).endOf("day");

    const attendanceData = await Attendance.find({
      entranceTime: { $gte: reportStartDate, $lte: reportEndDate },
    });

    res.status(200).json(attendanceData);
  } catch (error) {
    console.error("Error fetching monthly attendance report:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Report 4: Late coming report
const getLateComingReport = async (req, res) => {
  try {
    const reportEndDate = dayjs().endOf("day");
    const reportStartDate = dayjs().subtract(7, "day").startOf("day");

    const lateComings = await getLateComings(
      reportStartDate.toDate(),
      reportEndDate.toDate()
    );

    res.status(200).json(lateComings);
  } catch (error) {
    console.error("Error fetching late coming report:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Report 5: Leave count of all employees
const getLeaveCountReport = async (req, res) => {
  try {
    const users = await User.find(
      { role: "user" },
      { username: 1, leaveRequests: 1 }
    );

    const leaveCountData = users.map((user) => {
      const approvedLeaves = user.leaveRequests.filter(
        (request) => request.status === "approved"
      ).length;
      return { username: user.username, approvedLeaves };
    });

    res.status(200).json(leaveCountData);
  } catch (error) {
    console.error("Error fetching leave count report:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Report 6: Remaining leaves of all employees
const getRemainingLeavesReport = async (req, res) => {
  try {
    const users = await User.find(
      { role: "user" },
      { username: 1, leaveRequests: 1 }
    );

    const remainingLeavesData = users.map((user) => {
      const approvedLeaves = user.leaveRequests.filter(
        (request) => request.status === "approved"
      ).length;
      const remainingLeaves = user.totalLeaves - approvedLeaves;
      return { username: user.username, remainingLeaves };
    });

    res.status(200).json(remainingLeavesData);
  } catch (error) {
    console.error("Error fetching remaining leaves report:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getUnpaidLeavesReport,
  getMonthlyAttendanceReportByUser,
  getMonthlyAttendanceReport,
  getLateComingReport,
  getLeaveCountReport,
  getRemainingLeavesReport,
};
