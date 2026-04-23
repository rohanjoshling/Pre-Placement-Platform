import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/leaderboard.css";

function Leaderboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/leaderboard")
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="dashboard-root">
      <Navbar />
      <div className="dashboard-grid">

        <div className="card leaderboard-card">
          <h2 className="leaderboard-title">🏆 Leaderboard</h2>

          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Submissions</th>
              </tr>
            </thead>

            <tbody>
              {data.map((user, index) => (
                <tr key={index} className={index < 3 ? "top-row" : ""}>
                  <td className="rank-cell" >
                    {index === 0 && "1"}
                    {index === 1 && "2"}
                    {index === 2 && "3"}
                    {index > 2 && `#${index + 1}`}
                  </td>

                  <td className="name-cell">{user.name}</td>

                  <td className="score-cell">
                    <span className="score-badge">
                      {user.submissions}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default Leaderboard;