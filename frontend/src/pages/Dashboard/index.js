import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import socketio from "socket.io-client";
import "./styles.css";

export default function Dashboard() {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    const socket = socketio("http://localhost:3333");
  }, [])

  useEffect(() => {
    async function loadSpots() {
      const user_id = localStorage.getItem("user");
      const response = await api.get("/dashboard", {
        headers: { user_id }
      });
      
      setSpots(response.data);
    }

    loadSpots();
  }, [/** Execute just once inside our component */]);

  return (
    <>
      <ul className="spot-list">
        {spots.map(spot => (
          <li key={spot._id}>
            <header style={{ backgroundImage: `url(${spot.thumbnail_url})`}}/>
            <strong>{spot.company}</strong>
            <span>{spot.price ? `$${spot.price}/per day`: "FREE"}</span>
          </li>
        ))}
      </ul>

      <Link to="/new">
        <button className="btn">Register new spot</button>
      </Link>
    </>
  );
}