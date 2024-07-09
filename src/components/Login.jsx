import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext"; 
import { Footer } from "./Footer";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await auth.login(email, password);
      navigate("/contacts"); // Redirige al componente Principal
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Error al iniciar sesión: " + error.message); 
    }
  };

  return (
    <>
    <header>
        <div className="container navbar">
            <Link to="/">
            <img className="navbar__logo" src="./src/assets/SafeMe.png" alt="" />
            </Link>
            <ul className="navbar__menu">
                <li>
                    <Link to="/login">
                    <img src="./src/assets/login48.svg" alt="" />
                    </Link>
                </li>
                <li>
                    <Link to="/register">
                        Registrarse
                    </Link>
                </li>
            </ul>
        </div>
    </header>
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Iniciar Sesión</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Correo electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="form-control"
              />
            </div>

            <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
            <Link to="/register">
              <button className="btn btn-secondary">Registrarse</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};


    