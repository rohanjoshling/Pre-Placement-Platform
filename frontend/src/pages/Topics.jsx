import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/topics.css";

function Topics() {
  const navigate = useNavigate();

  const [topics, setTopics] = useState([]);
  
  useEffect(() => {
    axios
      .get("http://localhost:8000/topics")
      .then((res) => {
        setTopics(res.data);
      })
      .catch((err) => {
        console.log("Error fetching topics:", err);
      });
  }, []);

  return (
    <>
      <Navbar />

      <div className="topics-container">
        <h1>Topics</h1>

        <div className="topics-grid">
          {topics.map((t) => (
            <div
              key={t.name}
              className="topic-card"
              onClick={() => navigate(`/topics/${t.name}`)}
            >
              {t.name.toUpperCase()}
            </div>
          ))}
        </div>

        {topics.length === 0 && <p>No topics found</p>}
      </div>
    </>
  );
}

export default Topics;