const express = require("express");
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updatePicture,
  updateProfile,
  loginUser,
  UserExist,
  createLeaveRequest,
  updateLeaveRequest,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");

const router = express.Router();

//all users
router.get("/", getUsers);

//single user
router.get("/:userName", getSingleUser);
router.get("/exists/:userName", UserExist);

//insert new user
router.post("/", createUser);

//update user profile
router.put("/:userName/update-picture", updatePicture);
router.put("/:userName/update-profile", updateProfile);

//delete user
router.delete("/:userName", deleteUser);

//login user
router.post("/login", loginUser);

// Create leave request for a user
router.post("/:userName/leave-request", createLeaveRequest);

//  Update Leave request

router.put("/:userName/updateLeaveRequest", updateLeaveRequest);

// Route to initiate password reset process
router.post("/forgot-password", forgotPassword);

// Route to reset password using the token
router.put("/reset-password/:token", resetPassword);

module.exports = router;
