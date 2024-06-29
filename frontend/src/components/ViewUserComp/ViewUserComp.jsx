import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Button,
  Divider,
  TextField,
  Autocomplete,
  Dialog,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";
import { Delete } from "@mui/icons-material";
import DeleteUserComp from "../DeleteUserComp/DeleteUserComp";

const ViewUserComp = ({ userId }) => {

  const handleSave = async () => {
    try {
      await axios.put(`https://booknest-server-blue.vercel.app/api/v1/booknest/user/updateUser/${userId}`, user);
      setIsEditing(false);
    } catch (error) {
      console.log("Error saving user data", error);
    }
  };


  const [roles, setRoles] = useState([]);
  const [user, setUser] = useState({
    userId: "",
    email: "",
    name: "",
    phoneNumber: "",
    userType: "",
    role: "",
    isActive: true,
  });
  const [isEditing, setIsEditing] = useState(false);
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(`https://booknest-server-blue.vercel.app/api/v1/booknest/user/getUser/${userId}`);
        setUser(response.data.user);
      } catch (error) {
        console.log("Error", error);
      }
    };
    const fetchRolesData = async () => {
      try {
        let response = await axios.get(`https://booknest-server-blue.vercel.app/api/v1/booknest/user/getUser/${userId}`);
        setRoles(response.data);
      } catch (error) {
        console.log("Error", error);
      }
    };

    fetchRolesData();

    fetchData();
  }, [userId]);

  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };



  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Grid
      container
      spacing={2}
      style={{
        backgroundColor: "white",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Divider />
      <Grid item xs={12}>
        
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">
          <strong>Name:</strong>{" "}
          {isEditing ? (
            <TextField
              name="name"
              value={user.name}
              onChange={handleInputChange}
              fullWidth
            />
          ) : (
            user.name
          )}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">
          <strong>Email:</strong>{" "}
          {isEditing ? (
            <TextField
              name="email"
              value={user.email}
              onChange={handleInputChange}
              fullWidth
            />
          ) : (
            user.email
          )}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">
          <strong>Phone Number:</strong>{" "}
          {isEditing ? (
            <TextField
              name="phoneNumber"
              value={user.phone}
              onChange={handleInputChange}
              fullWidth
            />
          ) : (
            user.phone
          )}
        </Typography>
      </Grid>
      <Grid item xs={12}>

      </Grid>
      <Divider />
      <Grid item xs={12} textAlign="center">
        {isEditing ? (
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={handleSave}
          >
            Save
          </Button>
        ) : (
          <Grid>
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
              onClick={() => setIsEditing(true)}
            >
              Edit User
            </Button>
          </Grid>
        )}
      </Grid>

    </Grid>
  );
};

export default ViewUserComp;
