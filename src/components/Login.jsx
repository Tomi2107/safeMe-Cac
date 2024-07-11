import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { Footer } from "./Footer";
import "./Login.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await auth.login(email, password);
      navigate("/"); // Redirige al componente Principal
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
            <img className="navbar__logo" src="/assets/safeme.png" alt="" />
          </Link>
          <ul className="navbar__menu"></ul>
        </div>
      </header>

      <div className="login__container">
        <h1 className="login__titulo">INICIAR SESIÓN</h1>
        <h2 className="login__subtitulo">Ingresa tu usuario y contraseña</h2>
        <form className="login__items" onSubmit={handleLogin}>
          <div className="login__item">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="form-control"
            />
          </div>

          <div className="login__item">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="form-control"
            />
          </div>
            <button type="submit" className="login__button">
              Iniciar Sesión
            </button>
        </form>
        <Link to="/register">
          <p className="login__register">Aún no me he registrado</p>
        </Link>
      </div>
      <Footer />
    </>
  );
};
