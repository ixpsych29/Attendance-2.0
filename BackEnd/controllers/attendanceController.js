const dayjs = require("dayjs");
const Attendance = require("../models/attendanceModel");

//get all history with distinct employee count
const getAttendance = async (req, res) => {
  try {
    console.log("getAttendance");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};
const getTodayAttendances = async (req, res) => {
  try {
    const dateParam = req.query.date;
    const date = dateParam ? new Date(dateParam) : new Date();
    date.setHours(0, 0, 0, 0);

    // Query attendances for today
    const attendances = await Attendance.find({
      entranceTime: {
        $gte: date,
        $lt: new Date(date.getTime() + 24 * 60 * 60 * 1000),
      },
    }).sort({ entranceTime: 1 });

    // Mark late entries
    const lateThreshold = new Date(date);
    lateThreshold.setHours(11, 30, 0, 0);

    attendances.forEach((att) => {
      if (att.entranceTime > lateThreshold) {
        att.late = true;
      } else {
        att.late = false;
      }
    });

    // Save the updated attendances with late status
    await Promise.all(attendances.map((att) => att.save()));

    res.status(200).json(attendances);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

//get single day history
//
//
const getOneAttendance = async (req, res) => {
  try {
    const { userName } = req.params;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const employee = await Attendance.findOne({
      username: userName,
      entranceTime: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      },
    });
    res.status(200).json(employee);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

//insert new attendance record
const createAttendance = async (req, res) => {
  const { username, entranceTime } = req.body;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  //INSERT new document to DB
  try {
    const todayAttendance = await Attendance.create({
      username,
      entranceTime,
      leavingTime: null,
    });
    res.status(200).json(todayAttendance);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateAttendance = async (req, res) => {
  try {
    const { userName } = req.params;
    const { leavingTime } = req.body;

    // Get the current date without the time component
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // Find the attendance record for the current date
    let employee = await Attendance.findOne({
      username: userName,
      entranceTime: { $gte: currentDate },
    });

    if (!employee) {
      return res
        .status(404)
        .json({ error: "No check-in record found for today" });
    }

    // Update the leaving time of the existing record
    employee.leavingTime = leavingTime;
    await employee.save();

    res.status(200).json(employee);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

// Get present attendees for the current date
const getPresentOnes = async (req, res) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    console.log(now, startOfMonth, endOfMonth);

    const totalEmployees = await Employee.countDocuments(); // Assuming you have an Employee model

    const attendances = await Attendance.aggregate([
      {
        $match: {
          entranceTime: { $gte: startOfMonth, $lte: endOfMonth },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$entranceTime" } },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          date: "$_id",
          percentage: {
            $multiply: [{ $divide: ["$count", totalEmployees] }, 100],
          },
        },
      },
      {
        $sort: { date: 1 },
      },
    ]);

    res.status(200).json(attendances);
  } catch (error) {
    console.error("Error fetching attendance data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getMonthlyAttendances = async (req, res) => {
  try {
    const { userName } = req.params;
    let { startDate, endDate } = req.query;

    // If startDate and endDate are not provided, set default values for the current month
    if (!startDate || !endDate) {
      const now = new Date();
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    } else {
      startDate = new Date(startDate);
      endDate = new Date(endDate);
    }

    const attendances = await Attendance.find({
      username: userName,
      entranceTime: { $gte: startDate, $lte: endDate },
    });

    res.status(200).json(attendances);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

// controllers/attendanceController.js

const getAttendanceReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const reportStartDate = dayjs(startDate).startOf("day");
    const reportEndDate = dayjs(endDate).endOf("day");

    const attendanceData = await Attendance.find({
      entranceTime: { $gte: reportStartDate, $lte: reportEndDate },
    });
    res.status(200).json(attendanceData);
  } catch (error) {
    console.error("Error fetching attendance report", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
//exporting modules
module.exports = {
  getAttendance,
  getOneAttendance,
  createAttendance,
  updateAttendance,
  getPresentOnes,
  getTodayAttendances,
  getMonthlyAttendances,
  getAttendanceReport,
};
