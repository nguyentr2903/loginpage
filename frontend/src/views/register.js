import React, { useState } from "react";
import axios from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (formData.password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("/api/register", formData);
      alert(response.data.message); // Handle success
      setErrorMessage("");
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h1 className="text-center mb-4">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              id = "username"
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              id = "email"
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              id = "password"
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              id = "confirm-password"
            />
          </div>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          <button type="submit" className="btn btn-primary w-100" id="registerbutton">
            Register
          </button>
        </form>
        <p className="text-center mt-3">
          Already have an account? <a href="/">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
