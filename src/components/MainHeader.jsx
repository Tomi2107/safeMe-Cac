import "./MainHeader.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

export const MainHeader = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogout = () => {
    try {
      auth.logout();
      navigate("/login"); // Redirect to the home page or desired route after logout
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Error al cerrar sesión: " + error.message);
    }
  };

  return (
    <header>
      <div className="container navbar">
        {/* Logo SafeMe - Always displayed */}
        <Link to="/">
          <img className="navbar__logo" src="./src/assets/SafeMe.png" alt="" />
        </Link>

        {/* Conditional links based on login status */}
        {auth.user ? ( // If user is logged in
          <ul className="navbar__menu">
            <li>
              <Link to="/profile">
                <img src="./src/assets/person48.svg" alt="" />
              </Link>
            </li>
            <li>
              <Link to="/contacts">
                <img src="./src/assets/groups48.svg" alt="" />
              </Link>
            </li>
            <li>
              <Link to="/alerts">
                <img src="./src/assets/settings48.svg" alt="" />
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="btn btn-primary">
                Cerrar Sesión
              </button>
            </li>
          </ul>
        ) : ( // If user is not logged in
          <ul className="navbar__menu">
            <li>
              <Link to="/login">
                <img src="./src/assets/login48.svg" alt="" />
              </Link>
            </li>
            <li>
              <Link to="/register">
                <img src="./src/assets/person-add48.svg" alt="" />
              </Link>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
};

