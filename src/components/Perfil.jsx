import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useAuth } from '../context/authContext'; // Importo useAuth hook
import { updateDoc, doc, addDoc, getDoc } from 'firebase/firestore'; // Importo Firestore methods
import { useNavigate } from 'react-router-dom'; // Importo useNavigate hook
import { db } from "../firebaseConfig/firebase"; 
import { MainHeader } from './MainHeader';
import { Footer } from './Footer';
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import "./Perfil.css"

const mySwal = withReactContent(Swal);

export const Perfil = () => {
  const { register, handleSubmit, reset } = useForm();
  const auth = useAuth(); // Uso el useAuth hook
  const [loggedIn, setLoggedIn] = useState(false); // Trackeo el estado de login
  const navigate = useNavigate(); // Uso useNavigate hook
  const { user } = useAuth(); // Asumo que el objeto user esta disponible en useAuth
  const userId = user?.uid; // Extraigo el user ID si el usuario existe

  useEffect(() => {
    if (user) { // Verifico la disponibilidad de user antes de actualizar loggedIn
      setLoggedIn(true);
      fetchUserData(); // Buscar datos de usuario si está logueado y tiene ID
      // Llamo a fetchUserData solo cuando user esté disponible
    } else {
      setLoggedIn(false);
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      const userRef = doc(db, "usuarios", userId);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        reset({
          documento: userData.documento,
          fechaNacimiento: userData.fechaNacimiento,
          tipoSangre: userData.tipoSangre,
          enfermedades: userData.enfermedades,
          alergias: userData.alergias,
          notas: userData.notas,
        }); // Pre-llenar el formulario con datos del usuario
        } else {
          console.log("Usuario no encontrado en Firestore");
        // Inicializar valores predeterminados si no existen datos
        reset({
          documento: '',
          fechaNacimiento: '',
          tipoSangre: '',
          enfermedades: '',
          alergias: '',
          notas: '',
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const onSubmit = async (data) => {
    if (!loggedIn) {
      console.error("You must be logged in to save profile data");
      mySwal.fire({
        title: 'Error',
        text: 'Debes iniciar sesión para guardar los datos',
        icon: 'error',
      });
      return;
    }

    if (!userId) {
      console.error("Error: Unable to retrieve user ID");
      mySwal.fire({
        title: 'Error',
        text: 'Ocurrió un error al obtener el ID del usuario',
        icon: 'error',
      });
      return;
    }

    try {
      const userRef = doc(db, "usuarios", userId); // Referencia al documento de usuario
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        await updateDoc(userRef, data); // Update el documento de usuario con los datos de perfil
        console.log("Perfil actualizado exitosamente");
      } else {
        await addDoc(collection(db, "usuarios"), data); // Add nuevo documento de usuario
        console.log("Perfil creado exitosamente");
      }
      mySwal.fire({
        text: "Información guardada exitosamente",
        icon: "success",
      });
      reset(); // Limpio el formulario después del guardado exitoso
      navigate('/');
    } catch (error) {
      console.error("Error saving profile data:", error);
      mySwal.fire({
        title: 'Error',
        text: 'Ocurrió un error al guardar los datos',
        icon: 'error',
      });
    }
  };


  return (
    <>
      <MainHeader />
      <div className="perfil__container">
        <h1 className="perfil__titulo">PERFIL</h1>
        <h2 className="perfil__subtitulo">Completa tus datos</h2>
        <br />
        {loggedIn ? (
          <form className="perfil__form" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="documento">Documento:</label>
            <input type="text" id="documento" {...register("documento")} />

            <label htmlFor="fechaNacimiento">Fecha de nacimiento:</label>
            <input
              type="date"
              id="fechaNacimiento"
              {...register("fechaNacimiento")}
            />

            <label htmlFor="tipoSangre">Tipo de sangre:</label>
            <select id="tipoSangre" {...register("tipoSangre")}>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>

            <label htmlFor="enfermedades">Enfermedades:</label>
            <input type="text" id="enfermedades" {...register("enfermedades")} />

            <label htmlFor="alergias">Alergias:</label>
            <input type="text" id="alergias" {...register("alergias")} />

            <label htmlFor="notas">Otras notas médicas:</label>
            <textarea id="notas" {...register("notas")} />

            <button className="perfil__button" type="submit">Completar</button>
          </form>
        ) : (
          <p>Debes iniciar sesión para completar tu perfil.</p>
        )}
      </div>
      <Footer />
    </>
  );
};
