import { useState } from "react";
import Navbar from "../components/Navbar";
import SettingsSidebar from "../components/SettingsSidebar";
import { useNavigate } from "react-router-dom";
import { updateProfile, changePassword, deleteAccount } from "../services/api";
import "../styles/settings.css";

function Settings() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: localStorage.getItem("user_name") || "",
    password: "",
    newPassword: ""
  });

  const [active, setActive] = useState("profile");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ✅ PROFILE (JWT handles user)
  const handleSaveProfile = () => {
    if (!form.name) return alert("Enter name");

    updateProfile({ name: form.name })
      .then(() => {
        localStorage.setItem("user_name", form.name);
        alert("Profile updated");
      })
      .catch(() => alert("Update failed"));
  };

  // ✅ PASSWORD (JWT handles user)
  const handleChangePassword = () => {
    if (!form.password) return alert("Enter current password");
    if (!form.newPassword) return alert("Enter new password");

    changePassword({
      old_password: form.password,
      new_password: form.newPassword
    })
      .then(() => {
        alert("Password updated");
        setForm({ ...form, password: "", newPassword: "" }); // clear fields
      })
      .catch(() => alert("Incorrect password"));
  };

  // ✅ DELETE (JWT handles user)
  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    deleteAccount()
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

      <div className="settings-page">
        <SettingsSidebar active={active} setActive={setActive} />

        <div className="settings-content">
          <div className="settings-inner">

            {/* PROFILE */}
            {active === "profile" && (
              <div className="settings-card">
                <h1>Profile</h1>

                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Name"
                />

                <button onClick={handleSaveProfile}>Save</button>
              </div>
            )}

            {/* SECURITY */}
            {active === "security" && (
              <div className="settings-card">
                <h1>Security</h1>

                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Current Password"
                />

                <input
                  type="password"
                  name="newPassword"
                  value={form.newPassword}
                  onChange={handleChange}
                  placeholder="New Password"
                />

                <button onClick={handleChangePassword}>
                  Update Password
                </button>
              </div>
            )}

            {/* ACCOUNT */}
            {active === "account" && (
              <div className="settings-card danger">
                <h1>Account</h1>

                <button className="delete-btn" onClick={handleDeleteAccount}>
                  Delete Account
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;