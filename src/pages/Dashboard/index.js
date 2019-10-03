import React, { useEffect, Fragment, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./styles.css";

export default function Dashboard() {
  const [spots, setSpots] = useState([]);
  useEffect(() => {
    async function loadSpots() {
      const user_id = localStorage.getItem("user");

      const { data } = await api.get('/dashboard', {
        headers: { user_id },
      });
      setSpots(data);
    }
    loadSpots();
  }, []);
  return (
    <Fragment>
      <ul className="spot-list">
        {spots.map(spot => (
          <li key={spot._id}>
            <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
            <strong>{spot.company}</strong>
            <span>{spot.price ? `R$${spot.price}/dia` : "GRATUITO"}</span>
          </li>
        ))}
      </ul>
      <Link to="/new" >
        <button className="btn">Cadastrar novo spot</button>
      </Link>
    </Fragment>
  );
}