import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { MainHeader } from './MainHeader';
import { Footer } from './Footer';

import { useNavigate } from "react-router-dom";
import { collection, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';
import { setDoc } from 'firebase/firestore'; // Importo setDoc
import { useAuth } from "../context/authContext";
import './Registro.css';

const mySwal = withReactContent(Swal);

export const Registro = () => {
  const auth = useAuth();
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [contraseña2, setContraseña2] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    // Validación básica de contraseña
    if (contraseña !== contraseña2) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    try {
      const response = await auth.register(email, contraseña);

      if (response) {
        console.log(response); 

        // Extraigo el user ID desde Firebase response
        const userId = response.user.uid;

        // Creo el documento usuario in Firestore 
        if (userId) {
          const userRef = doc(collection(db, 'usuarios'), userId);
          await setDoc(userRef, {
            nombre,
            apellido,
            email,
          });
        }

        
        await auth.login(email, contraseña);

        mySwal.fire({
          text: "¡Usuario registrado exitosamente!",
          icon: "success",
        });

        navigate('/'); // Redirijo al componente principal
      } else {
        console.error('Error registering user:', 'Ocurrió un error al registrar el usuario');
        mySwal.fire({
          title: 'Error',
          text: 'Error al registrar usuario: Ocurrió un error al registrar el usuario',
          icon: 'error',
        });
      }
    } catch (error) {
      console.error('Error registering user:', error);
      mySwal.fire({
        title: 'Error',
        text: 'Error al registrar usuario: ' + error.message,
        icon: 'error',
      });
    }
  };

  return (
    <>
      <MainHeader />
      <div className="registro__container">
        <h1 className='registro__titulo'>CREA TU CUENTA</h1>
        <h2 className='registro__subtitulo'>Registra tus datos</h2>
        <form className='registro__form' onSubmit={handleSubmit}>
          <div className="registro__item">
            <label htmlFor="nombre">Nombre:</label>
            <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          </div>
          <div className="registro__item">
            <label htmlFor="apellido">Apellido:</label>
            <input type="text" id="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
          </div>
          <div className="registro__item">
            <label htmlFor="email">E-mail:</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="registro__item">
            <label htmlFor="contraseña">Contraseña:</label>
            <input type="password" id="contraseña" value={contraseña} onChange={(e) => setContraseña(e.target.value)} required />
          </div>
          <div className="registro__item">
            <label htmlFor="contraseña2">Repita contraseña:</label>
            <input type="password" id="contraseña2" value={contraseña2} onChange={(e) => setContraseña2(e.target.value)} required />
          </div>
          <button className='registro__button' type="submit">Registrar</button>
        </form>
      </div>
      <Footer />
    </>
  );
};





