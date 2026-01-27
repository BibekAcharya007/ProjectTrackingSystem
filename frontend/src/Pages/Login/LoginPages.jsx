import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";

const LoginPage = () => {

  // navigate() helps us move to another page programmatically
  const navigate = useNavigate();

  // State to store selected role (manager or employee)
  const [role, setRole] = useState("manager");

  // State to store entered email
  const [email, setEmail] = useState("");

  // State to store entered password
  const [password, setPassword] = useState("");

  // State to store error message (if login fails)
  const [error, setError] = useState("");

  // This function runs when user clicks Login button
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page refresh

    try {
      // Send login request to FastAPI backend
      const response = await axios.post("http://localhost:8000/auth/login", {
        email: email,
        password: password,
        role: role
      });

      // Extract token and role from backend response
      const { access_token, user_role } = response.data;

      // Save JWT token in browser storage
      localStorage.setItem("token", access_token);
      localStorage.setItem("role", user_role);

      // Redirect based on role
      if (user_role === "manager") {
        navigate("/manager/dashboard");
      } else {
        navigate("/employee/dashboard");
      }

    } catch (err) {
      // If login fails
      setError("Invalid email or password");
    }
  };

  // 🔥 RETURN MUST BE INSIDE COMPONENT
  return (
    <div className="login-container">
      <div className="login-card">

        <h2 className="login-title">Project Management System</h2>

        <form onSubmit={handleLogin}>

          {/* Role Selection */}
          <div className="role-box">

            <label>
              <input
                type="radio"
                value="manager"
                checked={role === "manager"}
                onChange={() => setRole("manager")}
              />
              Manager
            </label>

            <label>
              <input
                type="radio"
                value="employee"
                checked={role === "employee"}
                onChange={() => setRole("employee")}
              />
              Employee
            </label>

          </div>

          {/* Email Field */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />

          {/* Password Field */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />

          {/* Error Message */}
          {error && <p className="error-text">{error}</p>}

          {/* Login Button */}
          <button type="submit" className="login-button">
            Login
          </button>

        </form>
      </div>
    </div>
  );
};

export default LoginPage;
