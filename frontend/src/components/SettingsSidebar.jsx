import "../styles/settingsSidebar.css";

function SettingsSidebar({ active, setActive }) {
  return (
    <div className="settings-sidebar">
      <h2 className="sidebar-title">Settings</h2>

      <div
        className={active === "profile" ? "sidebar-item active" : "sidebar-item"}
        onClick={() => setActive("profile")}
      >
        Profile
      </div>

      <div
        className={active === "security" ? "sidebar-item active" : "sidebar-item"}
        onClick={() => setActive("security")}
      >
        Security
      </div>

      <div
        className={active === "account" ? "sidebar-item active" : "sidebar-item"}
        onClick={() => setActive("account")}
      >
        Account
      </div>
    </div>
  );
}

export default SettingsSidebar;