import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap"; // Importo Bootstrap components
import Swal from "sweetalert2"; // Importo SweetAlert2
import {
  getDocs,
  collection,
  where,
  query,
  doc,
  deleteDoc,
} from "firebase/firestore"; // Importo Firestore methods
import { useAuth } from "../context/authContext";
import { db } from "../firebaseConfig/firebase";
import { MainHeader } from "./MainHeader";
import { Footer } from "./Footer";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import "./Contactos.css";

export const Contactos = () => {
  const [contacts, setContacts] = useState([]); // Lista de contactos
  const auth = useAuth(); // Use the useAuth hook to get the context
  const loggedInUserId = auth.user?.uid; // Acceso al user ID desde el authContext

  // Función para obtener los contactos
  const getContacts = async () => {
    if (loggedInUserId) {
      const q = query(
        collection(db, "contactos"),
        where("usuarioId", "==", loggedInUserId)
      );
      const data = await getDocs(q);
      setContacts(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    } else {
      console.log("No user logged in, cannot fetch contacts");
      setContacts([]); // Limpia los contacto si no hay usuario logueado
    }
  };

  // Función para eliminar un contacto
  const deleteContact = async (id) => {
    try {
      const contactDoc = doc(collection(db, "contactos"), id);
      await deleteDoc(contactDoc);
      Swal.fire({
        title: "¡Contacto eliminado!",
        text: "",
        icon: "success",
      });
      getContacts(); // Refresca la lista de contactos despues de borrar
    } catch (error) {
      console.error("Error deleting contact:", error);
      Swal.fire({
        title: "Error al eliminar contacto",
        text: error.message,
        icon: "error",
      });
    }
  };

  // Consulta de borrado de contacto con un alerta de Sweetalert2
  const confirmDelete = (id) => {
    Swal.fire({
      title: "¿Estás seguro de eliminar este contacto?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteContact(id);
      }
    });
  };

  // Condicional para consultar si el usuario sigue logueado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      setLoggedInUserId(user?.uid);
    });

    return unsubscribe;
  }, []);

  // useEffect para obtener los contactos cuando el usuario cambia o se loguea
  useEffect(() => {
    getContacts();
  }, [loggedInUserId]);

  const navigate = useNavigate();

  return (
    <>
      <MainHeader />
      <div className="contactos-container">
        <h1 className="contactos-header">CONTACTOS</h1>
        <Table striped bordered hover className="contactos-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>
                <Link to="/create">
                  <img
                    src="/add.png"
                    className="add-contact-icon"
                    alt="Crear Contacto"
                  />
                </Link>
              </th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contacto) => (
              <tr key={contacto.id}>
                <td>{contacto.nombre}</td>
                <td>{contacto.apellido}</td>
                <td>{contacto.email}</td>
                <td>{contacto.telefono}</td>
                <td className="acciones">
                  <Link to={`/edit/${contacto.id}`}>
                    <img src="/edit.png" className="edit-contact-icon" />
                  </Link>
                  <img
                    src="/delete.png"
                    className="delete-contact-icon"
                    onClick={() => confirmDelete(contacto.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Footer />
    </>
  );
};
