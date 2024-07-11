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

      <div className="container-create">
        <h1 className="text-center">CONTACTO</h1>
        <h2 className="text-center">Registra a tu contacto</h2>
        <form onSubmit={createContacto} className="form-container">
          <div>
            <label htmlFor="nombre" className="form-label">
              Nombre:
            </label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="apellido" className="form-label">
              Apellido:
            </label>
            <input
              type="text"
              className="form-control"
              id="apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="telefono" className="form-label">
              Teléfono:
            </label>
            <input
              type="tel"
              className="form-control"
              id="telefono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
            />
          </div>

          <div className="button-group">
            <button type="submit" className="btn btn-primary">
              Registrar
            </button>
            <Link to="/contacts">
              <button type="button" className="btn btn-danger">
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
