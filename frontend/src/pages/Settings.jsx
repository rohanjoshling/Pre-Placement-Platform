import { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { updateProfile, changePassword, deleteAccount } from "../services/api";
import "../styles/settings.css";

function Settings() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: localStorage.getItem("user_name") || "",
    email: "",
    password: "",
    newPassword: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveProfile = () => {
    if (!form.email) return alert("Enter email");

    updateProfile({
      email: form.email,
      name: form.name
    })
      .then(() => {
        localStorage.setItem("user_name", form.name);
        alert("Profile updated");
      })
      .catch(() => alert("Update failed"));
  };

  const handleChangePassword = () => {
    if (!form.email || !form.password || !form.newPassword)
      return alert("Fill all fields");

    changePassword({
      email: form.email,
      old_password: form.password,
      new_password: form.newPassword
    })
      .then(() => alert("Password updated"))
      .catch(() => alert("Incorrect password"));
  };

  const handleDeleteAccount = () => {
    if (!form.email) return alert("Enter email");

    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    deleteAccount(form.email)
      .then(() => {
        alert("Account deleted");
        localStorage.clear();
        navigate("/login");
      })
      .catch(() => alert("Delete failed"));
  };

  return (
    <>
      <Navbar />

      <div className="settings-container">
        <h1 className="settings-title">Settings</h1>

        
        <div className="settings-card">
          <h2>Profile</h2>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email (required for all actions)"
          />

          <button onClick={handleSaveProfile}>Save Changes</button>
        </div>

        <div className="settings-card">
          <h2>Security</h2>

          <input
            type="password"
            name="password"
            value={form.password}
            placeholder="Current Password"
            onChange={handleChange}
          />

          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
            placeholder="New Password"
            onChange={handleChange}
          />

          <button onClick={handleChangePassword}>Update Password</button>
        </div>
        
        <div className="settings-card danger">
          <h2>Account</h2>

          <button className="delete-btn" onClick={handleDeleteAccount}>
            Delete Account
          </button>
        </div>
      </div>
    </>
  );
}

export default Settings;