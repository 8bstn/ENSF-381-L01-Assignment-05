import React, { useState } from "react";
import DisplayStatus from "./DisplayStatus";

const RegForm = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const { username, password, confirmPassword, email } = form;
    const usernameRegex = /^[A-Za-z][A-Za-z0-9_-]{2,19}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\[\]{}|;:'",.<>?/`~\-_=+]).{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|net|io)$/i;

    if (!usernameRegex.test(username)) {
      return { type: "error", message: "Invalid username format." };
    }
    if (!passwordRegex.test(password)) {
      return {
        type: "error",
        message:
          "Password must be 8+ chars, include uppercase, lowercase, number, and special char.",
      };
    }
    if (password !== confirmPassword) {
      return { type: "error", message: "Passwords do not match." };
    }
    if (!emailRegex.test(email)) {
      return { type: "error", message: "Invalid email format." };
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      setStatus(error);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ type: "success", message: data.message });
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        setStatus({ type: "error", message: data.message });
      }
    } catch {
      setStatus({ type: "error", message: "Server error." });
    }
  };

  return (
    <main className="login">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#4CAF50",
            padding: "10px",
            borderRadius: "5px",
            margin: "10px",
            opacity: 0.5,
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#45A049";
            e.target.style.opacity = 1.0;
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#4CAF50";
            e.target.style.opacity = 0.5;
          }}
        >
          Signup
        </button>
      </form>
      {status.message && <DisplayStatus type={status.type} message={status.message} />}
    </main>
  );
};

export default RegForm;
