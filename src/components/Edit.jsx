import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getDoc, doc, updateDoc } from "firebase/firestore"; // Importo Firestore methods
import { db } from "../firebaseConfig/firebase";
import { useAuth } from "../context/authContext"; // Importo useAuth hook
import Swal from "sweetalert2"; // Importo SweetAlert2
import { MainHeader } from "./MainHeader";
import { Footer } from "./Footer";
import "./Edit.css";

export const Edit = () => {
  // Estados para el formulario
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");

  // Auth context
  const auth = useAuth();
  const loggedIn = !!auth.user; // Chequea si el usuario esta logueado (boolean)

  // Redirección
  const navigate = useNavigate();

  // Capturo el Id del contacto a editar
  const { id } = useParams();

  // Función para actualizar un contacto en firestore
  const updateContact = async (e) => {
    e.preventDefault();
    if (!loggedIn) {
      console.error("You must be logged in to edit contacts");
      return; // Previene update si no hay usuario logueado
    }

    try {
      const contactDoc = doc(db, "contactos", id);
      const data = {
        nombre,
        apellido,
        email,
        telefono,
      };
      await updateDoc(contactDoc, data);

      // Muesta alerta exitoso with SweetAlert2
      Swal.fire({
        title: "¡Contacto editado!",
        text: "",
        icon: "success",
      }).then(() => {
        // Redireccionar a 'Contacts' después del éxito
        navigate("/contacts");
      });
    } catch (error) {
      console.error("Error editing contact:", error);
      Swal.fire({
        title: "Error al editar contacto",
        text: error.message,
        icon: "error",
      });
    }
  };

  // Función para obtener el contacto por su ID cuando se carga el componente Edit
  useEffect(() => {
    /* Función para obtener un documento por su ID */
    const getContactById = async (id) => {
      const contactDoc = await getDoc(doc(db, "contactos", id));
      if (contactDoc.exists()) {
        setNombre(contactDoc.data().nombre);
        setApellido(contactDoc.data().apellido);
        setEmail(contactDoc.data().email);
        setTelefono(contactDoc.data().telefono);
      } else {
        console.error("No existe el contacto que buscas");
      }
    };

    if (loggedIn) {
      // Solo busca el contacto si está logueado
      getContactById(id);
    }
  }, [id, loggedIn]);

  return (
    <>
      <MainHeader />
      {loggedIn ? (
        <>
          <div className="edit__container">
            <h1 className="edit__title">CONTACTO</h1>
            <h2 className="edit__subtitle">
              Actualice los datos de su contacto
            </h2>
            <form onSubmit={updateContact} className="edit__form">
              <label>Nombre</label>
              <input
                type="text"
                value={nombre}
                onChange={(evento) => setNombre(evento.target.value)}
                required
              />

              <label>Apellido</label>
              <input
                type="text"
                value={apellido}
                onChange={(evento) => setApellido(evento.target.value)}
                required
              />

              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(evento) => setEmail(evento.target.value)}
                required
              />

              <label>Telefono</label>
              <input
                type="tel"
                value={telefono}
                onChange={(evento) => setTelefono(evento.target.value)}
                required
              />

              <div className="edit__buttons">
                <button type="submit" className="edit__button">
                  Guardar cambios
                </button>
                <Link to="/contacts">
                  <button type="button" className="edit__button">
                    CANCELAR
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </>
      ) : (
        <p className="edit__error-msg">
          Tenés que estar logueado para editar el contacto.
        </p>
      )}
      <Footer />
    </>
  );
};
