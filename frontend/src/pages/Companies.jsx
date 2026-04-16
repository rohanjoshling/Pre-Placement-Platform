import Navbar from "../components/Navbar";
import CompanyCard from "../components/CompanyCard";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/companies.css";

function Companies() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [companies, setCompanies] = useState([]);

  // ✅ FETCH FROM BACKEND
  useEffect(() => {
    axios
      .get("http://localhost:8000/companies")
      .then((res) => {
        setCompanies(res.data);
      })
      .catch((err) => {
        console.log("Error fetching companies:", err);
      });
  }, []);

  const filteredCompanies = companies.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar search={search} setSearch={setSearch} />

      <div className="dashboard">
        <div className="main-content">
          <h1>Top Companies</h1>

          <div className="company-grid">
            {filteredCompanies.map((c) => (
              <CompanyCard
                key={c.name}
                company={c.name}
                     logo={c.logo} 
                onClick={() => navigate(`/questions/company/${c.name}`)}
              />
            ))}
          </div>

          {filteredCompanies.length === 0 && (
            <p>No companies found</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Companies;