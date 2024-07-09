const dayjs = require("dayjs");
const Attendance = require("../models/attendanceModel");
const fetchUsers = require("../controllers/userController").fetchUsers;
const User = require("../models/userModel");

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

    const attendances = await Attendance.find({
      entranceTime: {
        $gte: date,
        $lt: new Date(date.getTime() + 24 * 60 * 60 * 1000),
      },
    }).sort({ entranceTime: 1 });

    res.status(200).json(attendances);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

//For Late Coming
const getLateComings = async (req, res) => {
  try {
    const dateParam = req.query.date;
    const date = dateParam ? new Date(dateParam) : new Date();
    date.setHours(0, 0, 0, 0);

    // Define the late threshold
    const lateThreshold = new Date(date);
    lateThreshold.setHours(12, 30, 0, 0);

    // Query attendances for today after the late threshold
    const lateAttendances = await Attendance.find({
      entranceTime: {
        $gte: lateThreshold,
        $lt: new Date(date.getTime() + 24 * 60 * 60 * 1000),
      },
    }).sort({ entranceTime: 1 });

    res.status(200).json(lateAttendances);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

//get single day history
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

const getWeeklyAttendance = async (req, res) => {
  try {
    const { userName } = req.params;
    const today = new Date();
    const startDate = new Date(today.setDate(today.getDate() - 7));

    const attendances = await Attendance.find({
      username: userName,
      entranceTime: { $gte: startDate, $lte: new Date() },
    });

    res.status(200).json(attendances);
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
// const getPresentOnes = async (req, res) => {
//   try {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     // Find today's attendances
//     const todayAttendances = await Attendance.find({
//       entranceTime: {
//         $gte: today,
//         $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
//       },
//     });

//     // Get usernames of users who have checked in today
//     const presentUsernames = todayAttendances.map((att) => att.username);

//     // Retrieve all users using fetchUsers function
//     const allUsers = await fetchUsers({ role: "user" });

//     // Filter users who have an entrance time for today
//     const presentUsers = allUsers.filter((user) =>
//       presentUsernames.includes(user.username)
//     );

//     res.status(200).json(presentUsers);
//   } catch (error) {
//     console.error("Error fetching present attendees:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

const getPresentOnes = async (req, res) => {
  try {
    const { type } = req.query; // type can be 'monthly' or 'daily'

    if (type === "monthly") {
      const currentDate = new Date();
      const firstDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      const lastDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      );
      const daysInMonth = lastDayOfMonth.getDate();

      // Get total number of users
      const totalUsers = await User.countDocuments({ role: "user" });

      const attendanceData = await Attendance.aggregate([
        {
          $match: {
            entranceTime: {
              $gte: firstDayOfMonth,
              $lte: lastDayOfMonth,
            },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$entranceTime" },
            },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            date: "$_id",
            presentPercentage: {
              $multiply: [{ $divide: ["$count", totalUsers] }, 100],
            },
          },
        },
      ]);

      // Create an array with all days of the month
      const allDays = Array.from({ length: daysInMonth }, (_, i) => {
        const day = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          i + 1
        );
        return {
          date: day.toISOString().split("T")[0],
          presentPercentage: 0,
          absentPercentage: 100,
        };
      });

      // Merge attendance data with all days
      const mergedData = allDays.map((day) => {
        const matchingDay = attendanceData.find((d) => d.date === day.date);
        if (matchingDay) {
          return {
            ...matchingDay,
            absentPercentage: 100 - matchingDay.presentPercentage,
          };
        }
        return day;
      });

      res.status(200).json(mergedData);
    } else if (type === "daily") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Find today's attendances
      const todayAttendances = await Attendance.find({
        entranceTime: {
          $gte: today,
          $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
        },
      });

      // Get usernames of users who have checked in today
      const presentUsernames = todayAttendances.map((att) => att.username);

      // Retrieve all users using fetchUsers function
      const allUsers = await fetchUsers({ role: "user" });

      // Filter users who have an entrance time for today
      const presentUsers = allUsers.filter((user) =>
        presentUsernames.includes(user.username)
      );

      res.status(200).json(presentUsers);
    } else {
      res
        .status(400)
        .json({ error: 'Invalid type parameter. Use "monthly" or "daily".' });
    }
  } catch (error) {
    console.error("Error fetching attendance data:", error);
    res.status(500).json({
      message: "Error fetching attendance data",
      error: error.message,
    });
  }
};

const getAbsentOnes = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find today's attendances
    const todayAttendances = await Attendance.find({
      entranceTime: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      },
    });

    // Get usernames of users who have checked in today
    const presentUsernames = todayAttendances.map((att) => att.username);

    // Retrieve all users using fetchUsers function
    const allUsers = await fetchUsers({ role: "user" });

    // Filter users who don't have an entrance time for today
    const absentUsers = allUsers.filter(
      (user) => !presentUsernames.includes(user.username)
    );

    res.status(200).json(absentUsers);
  } catch (error) {
    console.error("Error fetching absent attendees:", error);
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
  getAbsentOnes,
  getWeeklyAttendance,
  getLateComings,
};
