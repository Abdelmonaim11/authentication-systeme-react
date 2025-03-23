import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Typography,
  Paper,
} from "@mui/material";
import {
  AccountCircle,
  AccountBox,
  Lock,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    if (!formData.username || !formData.name || !formData.password) {
      setError("All fields are required!");
      return;
    }

    try {
      const checkUser = await axios.get(
        `http://localhost:5000/users?username=${formData.username}`
      );

      if (checkUser.data.length > 0) {
        setError("Username already taken!");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/users",
        formData
      );
      console.log("User created:", response.data);

      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing up:", error);
      setError("Something went wrong!");
    }
  };

  const navigateToSignIn = (e) => {
    e.preventDefault();
    navigate("/signin");
  };

  const navigateToDashboard = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <Paper elevation={3} className="p-4">
            {/* <Typography variant="h4" className="text-center mb-4">
              Sign In
            </Typography> */}
            <div>
              <img
                src="enset-logo.png"
                alt="logo"
                style={{
                  width: "400px",
                  height: "200px",
                  display: "block",
                  margin: "auto",
                }}
              />
            </div>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                margin="normal"
                label="Username"
                name="username"
                variant="outlined"
                value={formData.username}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle color="primary" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                margin="normal"
                label="Name"
                name="name"
                variant="outlined"
                value={formData.name}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountBox color="primary" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                margin="normal"
                label="Password"
                name="password"
                variant="outlined"
                type="password"
                value={formData.password}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="primary" />
                    </InputAdornment>
                  ),
                }}
              />

              <div className="d-grid gap-2 mt-4">
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                  fullWidth
                  className="mb-3"
                >
                  Sign Up
                </Button>

                <Typography className="text-center mt-2">
                  Already registred?{" "}
                  <a
                    href="#"
                    onClick={navigateToSignIn}
                    className="text-decoration-none"
                  >
                    Click to sign in!
                  </a>
                </Typography>
              </div>
            </form>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
