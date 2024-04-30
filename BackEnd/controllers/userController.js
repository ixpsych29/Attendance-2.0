const User = require("../models/userModel");
const multer = require("multer");
const path = require("path");
// const mongoose = require("mongoose");

//get all Users
const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).sort({ created_at: 1 });
    const totalEmployees = users.length;

    res.status(200).json({ totalEmployees, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//get a single User
const getSingleUser = async (req, res) => {
  const { userName } = req.params;
  const user = await User.findOne({ username: userName });
  if (!user) {
    return res.status(404).json({ error: "No user found" });
  }
  res.status(200).json(user);
};

//CREATE a new User
const createUser = async (req, res) => {
  const { name, username, email, password } = req.body;

  //ADD doc to DB
  try {
    const newUser = await User.create({
      name,
      username,
      email,
      password,
    });
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Delete a User
const deleteUser = async (req, res) => {
  const { userName } = req.params;

  // if (!mongoose.Types.ObjectId.isValid(userName)) {
  //   return res.status(404).json({ error: "No such user found, try again!" });
  // }

  const user = await User.findOneAndDelete({ username: userName });

  if (!user) {
    return res.status(404).json(user);
  }
  res.status(200).json(user);
};

//profile picture updation logic starts here...

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/images/"); //specify the destination folder
  },
  filename: (req, file, cb) => {
    //using username and timeStamp to create File name
    const timeStamp = new Date().toISOString().replace(/[-:.]/g, "");
    const filename = `${req.params.userName}_${timeStamp}_${file.originalname}`;
    console.log(file.originalname);
    console.log(filename);
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  //allow only images
  if (file.mimetype.match(/^image\/(jpg|jpeg|png)$/)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid File Type, please upload an image"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, //limiting to 5MB
  },
});

//update a ProfilePicture of User
const updatePicture = async (req, res) => {
  console.log(req.body);
  const { userName } = req.params;

  try {
    // using multer to handle file upload
    upload.single("profilePicture")(req, res, (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      //extracting the file name
      const fileName = req.file.filename;
      console.log(fileName);

      // updating the mongoDB with picName
      const updateRes = User.findOneAndUpdate(
        { username: userName },
        { profilePicture: fileName },
        { new: true },
      ).then((user) => {
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        //otherwise respond with success message
        res
          .status(200)
          .json({ message: "Profile picture updated successfully" });
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//updating a profile of user
const updateProfile = async (req, res) => {
  const { userName } = req.params;
  const { phoneNo, password } = req.body;

  //ADD doc to DB
  try {
    if (phoneNo) {
      const newUser = await User.findOneAndUpdate(
        { username: userName },
        { phoneNumber: phoneNo },
        { new: true },
      );
      res.status(200).json(newUser);
    }
    if (password) {
      const newUser = await User.findOneAndUpdate(
        { username: userName },
        { password: password },
        { new: true },
      );
      res.status(200).json(newUser);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//login a user
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    // Check user role
    if (user.role === "admin") {
      return res
        .status(200)
        .json({ message: "Admin Login successful", role: "admin" });
    } else {
      return res
        .status(200)
        .json({ message: "User Login successful", role: "user" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

async function UserExist(req, res) {
  const { userName } = req.params;
  try {
    const user = await User.findOne({ username: userName }).exec();
    if (user) {
      // User found, so it exists
      return res.status(200).json({ exists: true });
    } else {
      // User not found, so it does not exist
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

//exporting modules
module.exports = {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updatePicture,
  updateProfile,
  loginUser,
  upload,
  UserExist,
};
