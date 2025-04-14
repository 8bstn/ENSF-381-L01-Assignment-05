import React, { useState, useEffect, createContext } from "react";
import Header from "./Header";
import Footer from "./Footer";
import DisplayStatus from "./DisplayStatus";
import AuthMessage from "./AuthMessage";

export const AuthContext = createContext();

const LoginForm = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [authStatus, setAuthStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    if (!formData.username || !formData.password) {
      setAuthStatus({ type: "error", message: "All fields are required." });
      return false;
    }
    if (formData.password.length < 8) {
      setAuthStatus({
        type: "error",
        message: "Password must be at least 8 characters.",
      });
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const users = await res.json();
      const match = users.find(
        (user) =>
          user.username.toLowerCase() === formData.username.toLowerCase() &&
          user.email.toLowerCase() === formData.password.toLowerCase()
      );

      if (match) {
        setAuthStatus({
          type: "success",
          message: "Login successful! Redirecting...",
        });
        setTimeout(() => {
          window.location.href = "/courses";
        }, 2000);
      } else {
        setAuthStatus({
          type: "error",
          message: "Invalid username or password.",
        });
      }
    } catch {
      setAuthStatus({
        type: "error",
        message: "Server error. Please try again later.",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ authStatus }}>
      <Header />
      <main className="login">
        <h2>LMS Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Email as Password"
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit">Login</button>
        </form>
        <a href="#">Forgot Password?</a>
        <br />
        <a href="/signup">Don’t have an account? Sign Up</a>
        <AuthMessage />
      </main>
      <Footer />
    </AuthContext.Provider>
  );
};

export default LoginForm;
