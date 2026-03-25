import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar"
import CompanyCard from "../components/CompanyCard";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import amazonlogo  from "../logos/amazon.png";
import googlelogo from "../logos/google.png";
import microsoftlogo from "../logos/microsoft.png";
// import Infosyslogo from "../logos/infosys.png";
import Netfixlogo from "../logos/netflix.png";
function Dashboard() {
  const navigate = useNavigate();

  const companies = [
    { name: "Amazon", logo: amazonlogo},
    { name: "Google", logo: googlelogo },
    { name: "Microsoft", logo: microsoftlogo},
    { name: "Netflix" , logo: Netfixlogo}
  ];

  return (
    <>
      <Navbar />

      <div className="dashboard">
        <Sidebar />

        <div className="main-content">
          <h1>Select a Company</h1>

          <div className="company-grid">
            {companies.map(c => (
              <CompanyCard
                key={c.name}
                company={c.name}
                logo={c.logo}
                onClick={() => navigate(`/questions/company/${c.name}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;