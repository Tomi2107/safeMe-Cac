import React, { useState } from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {MainHeader} from './MainHeader'
import { Footer } from './Footer';
import { useNavigate } from "react-router-dom"
import { collection, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';
import { setDoc } from 'firebase/firestore'; // Importo setDoc
import { useAuth } from "../context/authContext";
import './Registro.css';

export const Registro = () => {
  const auth = useAuth();
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [contraseña2, setContraseña2] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica de contraseña
    if (contraseña !== contraseña2) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    try {
      const response = await auth.register(email, contraseña); // Uso auth desde context
      console.log(response); 

      // Obtengo el nuevo user UID 
      const userId = response.user.uid;

      // Creo un documento de usuario en  Firestore 
      if (userId) {
        const userRef = doc(collection(db, 'usuarios'), userId);
        await setDoc(userRef, {
          nombre,
          apellido,
          email,
        });
      }

      alert("Usuario registrado con éxito");
      navigate('/'); // Redirijo si el registro fue exitoso.
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Error al registrar usuario: ' + error.message);
    }
  };


  return (
    <>
      <MainHeader />
      <div className="form-container">
        <h1>CREA TU CUENTA</h1>
        <h2>Registra tus datos</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="apellido">Apellido:</label>
            <input type="text" id="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-mail:</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="contraseña">Contraseña:</label>
            <input type="password" id="contraseña" value={contraseña} onChange={(e) => setContraseña(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="contraseña2">Repita contraseña:</label>
            <input type="password" id="contraseña2" value={contraseña2} onChange={(e) => setContraseña2(e.target.value)} required />
          </div>
          <button type="submit">Registrar</button>
        </form>
      </div>
      <Footer />
    </>
  );
};
