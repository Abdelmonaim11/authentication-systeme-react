import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your authentication logic here
  };

  const navigateToSignUp = (e) => {
    e.preventDefault();
    navigate("/signup");
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
