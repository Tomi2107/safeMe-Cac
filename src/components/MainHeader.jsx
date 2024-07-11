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
      navigate("/login"); // Redireccionar al componente Login después del cierre de sesión
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Error al cerrar sesión: " + error.message);
    }
  };

  return (
    <header>
      <div className="container navbar">
        {/* Logo SafeMe */}
        <Link to="/">
          <img className="navbar__logo" src="../src/assets/SafeMe.png" alt="" />
        </Link>

        {/* Links condicionales basados en el estado de login */}
        {auth.user ? ( // Si el usuario está logueado
          <ul className="navbar__menu">
            <li>
              <Link to="/profile">
                <img src="/assets/person48.svg" alt="" />
              </Link>
            </li>
            <li>
              <Link to="/contacts">
                <img src="/assets/groups48.svg" alt="" />
              </Link>
            </li>
            <li>
              <Link to="/alerts">
                <img src="/assets/settings48.svg" alt="" />
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="btn btn-primary">
                Cerrar Sesión
              </button>
            </li>
          </ul>
        ) : ( // Si el usuario no está logueado
          <ul className="navbar__menu">
            <li>
              <Link to="/login">
                <img src="/assets/login48.svg" alt="" />
              </Link>
            </li>
            <li>
              <Link to="/register">
                <img src="/assets/person-add48.svg" alt="" />
              </Link>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
};

