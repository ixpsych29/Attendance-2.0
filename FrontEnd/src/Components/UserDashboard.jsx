import { Container, CssBaseline } from "@mui/material";
import RecordList from "./RecordList";
import { useState, useEffect, useContext } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "./UserContext";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";

const UserDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const navigate = useNavigate();
  const { username, Api_EndPoint } = useContext(UserContext);
  const [userStatus, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
      const response = await axios.get(`${Api_EndPoint}/api/users/${username}`);
      setStatus(response.data.status);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user:", error);
      toast.error("Error fetching user");
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (userStatus === "pending") {
      navigate("/update-password");
    }
  }, [userStatus, navigate]);

  return (
    <Container sx={{ mt: 0 }}>
      {loading ? (
        <p>
          <Loader />
        </p>
      ) : (
        <>
          <CssBaseline />
          <RecordList
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </>
      )}
    </Container>
  );
};

export default UserDashboard;
