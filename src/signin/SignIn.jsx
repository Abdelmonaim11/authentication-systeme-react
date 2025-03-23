import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./../context/AuthContext";
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
  Lock,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your authentication logic here
    try {
      const response = await fetch(
        `http://localhost:5000/users?username=${formData.username}&password=${formData.password}`
      );
      const data = await response.json();
      console.log(data);
      login(data[0]);
      if (data.length > 0) {
        navigateToDashboard(e);
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong!");
    }
  };

  const navigateToSignUp = (e) => {
    e.preventDefault();
    navigate("/signup");
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
              {error && <p style={{ color: "red" }}>{error}</p>}
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
                  Sign In
                </Button>

                <Typography className="text-center mt-2">
                  New User?{" "}
                  <a
                    href="#"
                    onClick={navigateToSignUp}
                    className="text-decoration-none"
                  >
                    Click to sign up!
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
