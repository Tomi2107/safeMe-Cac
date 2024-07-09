import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import Auth methods
import { db } from "../firebaseConfig/firebase"; 
import { MainHeader } from "./MainHeader";
import { Footer } from "./Footer";
import './Create.css'

export const Create = () => {
  //Estados para guardar los datos del contacto
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [usuarioId, setUsuarioId] = useState(""); // For logged-in user ID

  // Función de redirección
  const navigate = useNavigate();

  // Toma la instacia de crear
  const auth = getAuth();

  // Función para crear contacto
  const createContacto = async (e) => {
    e.preventDefault();

    // toma el ID del usuario logueado
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsuarioId(user.uid);
      }
    });

    // Agrega nuevo contacto a la colección "contactos" 
    await addDoc(collection(db, "contactos"), {
      nombre: nombre,
      apellido: apellido,
      email: email,
      telefono: telefono,
      usuarioId: usuarioId, // Referencia al usuario logueado
    });

    // Redirige al componente Contactos
    navigate("/contactos");
  };

  return (
    <>
    <MainHeader/>
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Crear Contacto</h1>
          <form onSubmit={createContacto}>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                value={nombre}
                onChange={(event) => setNombre(event.target.value)}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Apellido</label>
              <input
                type="text"
                value={apellido}
                onChange={(event) => setApellido(event.target.value)}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Teléfono</label>
              <input
                type="tel"
                value={telefono}
                onChange={(event) => setTelefono(event.target.value)}
                className="form-control"
              />
            </div>

            <button type="submit" className="btn btn-primary">Crear Contacto</button>
            <Link to="/contactos">
              <button className="btn btn-danger">CANCELAR</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};
