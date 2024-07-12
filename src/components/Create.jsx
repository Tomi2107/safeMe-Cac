import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import { useAuth } from "../context/authContext";
import Swal from "sweetalert2";
import { MainHeader } from "./MainHeader";
import { Footer } from "./Footer";
import "./Create.css";

export const Create = () => {
  // Estados para guardar los datos del contacto
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");

  // Función de redirección
  const navigate = useNavigate();

  // Obtener el estado de usuario logueado
  const { user } = useAuth();

  // Función para crear contacto
  const createContacto = async (e) => {
    e.preventDefault();

    // Verificar si hay un usuario logueado
    if (!user) {
      console.error("No hay usuario logueado, no se puede crear contacto");
      return; // Evitar ejecución si no hay usuario
    }

    // Obtener el ID del usuario logueado
    const currentUserId = user.uid;

    // Crear el documento de contacto con referencia al usuario
    const contactRef = await addDoc(collection(db, "contactos"), {
      nombre: nombre,
      apellido: apellido,
      email: email,
      telefono: telefono,
      usuarioId: currentUserId,
    });

    // Mostrar SweetAlert2 de éxito
    Swal.fire({
      title: "¡Contacto creado!",
      text: "El contacto se ha creado correctamente.",
      icon: "success",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Aceptar",
    }).then(() => {
      // Redirigir al componente Contactos
      navigate("/contacts");
    });
  };

  return (
    <>
      <MainHeader />

      <div className="create__container">
        <h1 className="create__title">CONTACTO</h1>
        <h2 className="create__subtitle">Registra a tu contacto</h2>
        <form onSubmit={createContacto} className="create__form">
          <label htmlFor="nombre">
            Nombre:
          </label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />

          <label htmlFor="apellido">
            Apellido:
          </label>
          <input
            type="text"
            id="apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />

          <label htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="telefono">
            Teléfono:
          </label>
          <input
            type="tel"
            id="telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />

          <div className="create__buttons">
            <button type="submit" className="create__button">
              Registrar
            </button>
            <Link to="/contacts">
              <button type="button" className="create__button">
                CANCELAR
              </button>
            </Link>
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
};
