import Webcam from "react-webcam";
import { useCallback, useContext, useRef, useState, useEffect } from "react";
import axios from "axios";
import UserContext from "./UserContext";
import { Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import RefreshIcon from "@mui/icons-material/Refresh";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PictureCam = () => {
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [checkedIn, setCheckedIn] = useState(false);
  // const [permissionGranted, setPermissionGranted] = useState(false);
  const { username, Api_EndPoint } = useContext(UserContext);
  // const [permissionRequested, setPermissionRequested] = useState(false);

  useEffect(() => {
    // Check if the user has already checked in for the day
    const checkIfCheckedIn = async () => {
      try {
        const response = await axios.get(
          `${Api_EndPoint}/api/attendance/${username}`
        );
        setCheckedIn(!!response.data);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    checkIfCheckedIn();
  }, [username, Api_EndPoint]);

  useEffect(() => {
    // If the user checks in or checks out, reset the image source
    setImgSrc(null);
  }, [checkedIn]);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);

  const retake = () => {
    setImgSrc(null);
  };

  const handlePicSubmit = async () => {
    const date = new Date();
    try {
      if (!checkedIn) {
        // Check-in logic
        await axios.post(`${Api_EndPoint}/api/attendance`, {
          username: username,
          picture: imgSrc,
          entranceTime: date.toISOString(),
        });

        // Notify user and set checked-in state
        toast.success("Check-in Successful!");
        setCheckedIn(true);
      } else {
        // Check-out logic
        await axios.put(`${Api_EndPoint}/api/attendance/${username}`, {
          leavingTime: date,
        }); // Notify user and reset state
        toast.success("Check-out Successful!");
        setCheckedIn(false);
      }

      navigate("/home");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  // useEffect(() => {
  //   if (!permissionRequested) {
  //     const requestCameraPermission = async () => {
  //       try {
  //         await navigator.mediaDevices.getUserMedia({ video: true });
  //         setPermissionGranted(true);
  //       } catch (error) {
  //         console.log("Error requesting camera access:", error);
  //       }
  //     };

  //     requestCameraPermission();
  //     setPermissionRequested(true);
  //   }
  // }, [permissionRequested]);
  return (
    <div className="container">
      {imgSrc ? (
        <img src={imgSrc} alt="webcam" />
      ) : (
        <Webcam
          height={300}
          width={300}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          screenshotQuality={0.8}
          mirrored={true}
        />
      )}
      <div style={{ textAlign: "center" }}>
        {imgSrc ? (
          <>
            <Button
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: "#1db0e6",
                "&:hover": { bgcolor: "#1688b3" },
              }}
              onClick={retake}
            >
              <RefreshIcon />
            </Button>
            <Button
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                ml: 1,
                bgcolor: "#1db0e6",
                "&:hover": { bgcolor: "#1688b3" },
              }}
              onClick={handlePicSubmit}
            >
              {checkedIn ? <CheckIcon /> : "Check-in"}
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              mx: "auto",
              bgcolor: "#1db0e6",
              "&:hover": { bgcolor: "#1688b3" },
            }}
            onClick={capture}
          >
            {checkedIn ? "Check-out" : "Check-in"} &nbsp;
            <CameraAltIcon />
          </Button>
        )}
      </div>
    </div>
  );
};

export default PictureCam;
