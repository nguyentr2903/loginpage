import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Login.css"; 

const Login = () => {
  const [formData, setFormData] = useState({ emailOrUsername: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.emailOrUsername || !formData.password) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", formData);
      alert(response.data.message);
      setErrorMessage("");
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Invalid login attempt.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="text-center mb-4" id='logintitle'>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              name="emailOrUsername"
              placeholder="Username or Email"
              value={formData.emailOrUsername}
              onChange={handleChange}
              id ="inputname"
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
               id ="inputpass"
            />
          </div>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          <button type="submit" className="btn btn-primary w-100" id="loginbutton">Login</button>
        </form>
        <p className="text-center mt-3">
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
