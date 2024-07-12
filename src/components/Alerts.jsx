import React, { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { db } from "../firebaseConfig/firebase";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  query,
  where,
  getDoc,
} from "firebase/firestore";
import { MainHeader } from "./MainHeader";
import { Footer } from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import "./Alerts.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const Alerts = () => {
  const [contactos, setContactos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedContactoSeguridad, setSelectedContactoSeguridad] =
    useState("");
  const [selectedContactoSalud, setSelectedContactoSalud] = useState("");
  const [mensajeSeguridad, setMensajeSeguridad] = useState("");
  const [mensajeSalud, setMensajeSalud] = useState("");
  const [alertasSeguridad, setAlertasSeguridad] = useState({}); // Initialize as an empty object
  const [alertasSalud, setAlertasSalud] = useState({}); // Initialize as an empty object
  const { user } = useAuth();
  const mySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const userId = user?.uid;

  useEffect(() => {
    const fetchContactos = async () => {
      try {
        const contactosQuery = query(
          collection(db, "contactos"),
          where("usuarioId", "==", userId)
        );
        const contactosSnap = await getDocs(contactosQuery);
        const contactosData = contactosSnap.docs.map((doc) => doc.data());
        setContactos(contactosData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        // You can display an error message to the user here
      }
    };

    const fetchAlertas = async () => {
      try {
        const mensajesSeguridadRef = doc(db, "mensajesAlertaSeguridad", userId);
        const mensajesSaludRef = doc(db, "mensajesAlertaSalud", userId);

        const mensajesSeguridadSnap = await getDoc(mensajesSeguridadRef);
        const mensajesSaludSnap = await getDoc(mensajesSaludRef);

        const mensajeSeguridadData = mensajesSeguridadSnap.exists()
          ? mensajesSeguridadSnap.data()
          : {};
        const mensajeSaludData = mensajesSaludSnap.exists()
          ? mensajesSaludSnap.data()
          : {};

        setAlertasSeguridad(mensajeSeguridadData);
        setAlertasSalud(mensajeSaludData);

        // Para que muestre los mensajes que ya están creados
        if (mensajeSeguridadData.mensaje)
          setMensajeSeguridad(mensajeSeguridadData.mensaje);
        if (mensajeSaludData.mensaje) setMensajeSalud(mensajeSaludData.mensaje);

        // Establecer los contactos seleccionados
        if (mensajeSeguridadData.contactoId)
          setSelectedContactoSeguridad(mensajeSeguridadData.contactoId);
        if (mensajeSaludData.contactoId)
          setSelectedContactoSalud(mensajeSaludData.contactoId);
      } catch (error) {
        console.error("Error fetching alerts:", error);
        // You can display an error message to the user here
      }
    };

    if (userId) { // Me aseguro de que fetchContactos y fetchAlertas solo se llamen cuando userId esté disponible
      fetchContactos();
      fetchAlertas();
    }
  }, [user, db]);

  const handleContactoChangeSeguridad = (event) => {
    setSelectedContactoSeguridad(event.target.value);
  };

  const handleContactoChangeSalud = (event) => {
    setSelectedContactoSalud(event.target.value);
  };

  const handleMensajeSeguridadChange = (event) => {
    setMensajeSeguridad(event.target.value);
  };

  const handleMensajeSaludChange = (event) => {
    setMensajeSalud(event.target.value);
  };

  const handleAddAlertas = async () => {
    if (!user) {
      alert("Debes iniciar sesión para agregar alertas.");
      return;
    }

    const mensajesSeguridadRef = doc(db, "mensajesAlertaSeguridad", userId);
    const mensajesSaludRef = doc(db, "mensajesAlertaSalud", userId);

    try {
      // Update existing messages (if any)
      if (alertasSeguridad.contactoId && alertasSalud.contactoId) {
        await updateDoc(mensajesSeguridadRef, { mensaje: mensajeSeguridad });
        await updateDoc(mensajesSaludRef, { mensaje: mensajeSalud });
      } else {
        // Add new messages
        await setDoc(mensajesSeguridadRef, {
          usuarioId: user.uid,
          contactoId: selectedContactoSeguridad,
          mensaje: mensajeSeguridad,
        });
        await setDoc(mensajesSaludRef, {
          usuarioId: user.uid,
          contactoId: selectedContactoSalud,
          mensaje: mensajeSalud,
        });
      }

      mySwal.fire({
        text: "Alertas guardadas correctamente.",
        icon: "success",
      }).then(() => {
        navigate("/");
      });
    } catch (error) {
      console.error("Error saving alerts:", error);
      mySwal.fire({
        text: "Error al guardar las alertas",
        icon: "error",
      });
    }
  };

  return (
    <>
      <MainHeader />
      {user ? (
        <div className='alerts__container'>
            <h1 className="alerts__titulo">ALERTAS</h1>
            <h2 className="alerts__subtitulo">Configura tus alertas</h2>
            <h2 className='alerts__section'>Alerta de Seguridad</h2>
            <div className='alerts__group'>
                {isLoading ? (
                  <p>Cargando contactos...</p>
                ) : (
                  <>
                  <label htmlFor="contactoSeguridad">Contacto:</label>
                  <select id="contactoSeguridad" value={selectedContactoSeguridad} onChange={handleContactoChangeSeguridad} required>
                    <option value="">Seleccionar Contacto</option>
                    {contactos.map((contacto) => (
                      <option key={contacto.id} value={contacto.id}>
                        {contacto.nombre} {contacto.apellido}
                      </option>
                    ))}
                  </select>
                  </>
                )}
                <label htmlFor="mensajeSeguridad">Mensaje:</label>
                <textarea id='mensajeSeguridad' value={mensajeSeguridad} onChange={handleMensajeSeguridadChange} placeholder="Ingresar mensaje de alerta" required />
            </div>
            <h2 className='alerts__section'>Alerta de Salud</h2>
            <div className='alerts__group'>
                {isLoading ? (
                  <p>Cargando contactos...</p>
                ) : (
                  <>
                  <label htmlFor="contactoSalud">Contacto:</label>
                  <select id="contactoSalud" value={selectedContactoSalud} onChange={handleContactoChangeSalud} required>
                    <option value="">Seleccionar Contacto</option>
                    {contactos.map((contacto) => (
                      <option key={contacto.id} value={contacto.id}>
                        {contacto.nombre} {contacto.apellido}
                      </option>
                    ))}
                  </select>
                  </>
                )}
                <label htmlFor="mensajeSalud">Mensaje:</label>
                <textarea id='mensajeSalud' value={mensajeSalud} onChange={handleMensajeSaludChange} placeholder="Ingresar mensaje de alerta" required />
            </div>
            <div className='alerts__buttons'>
                <button className="alerts__button" onClick={handleAddAlertas}>Agregar Alertas</button>
                <Link to="/">
                  <button className="alerts__button">CANCELAR</button>
                </Link>
            </div>
        </div>
      ) : (
        <div>
          <p>Inicia sesión para ver tus contactos y crear alertas.</p>
          <Link to="/login">Iniciar Sesión</Link>
        </div>
      )}
      <Footer />
    </>
  );
};
