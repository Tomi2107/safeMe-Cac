import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap'; // Importo Bootstrap components
import Swal from 'sweetalert2'; // Importo SweetAlert2
import { getDocs, collection, where, query } from 'firebase/firestore'; // Importo Firestore methods
import { useAuth } from '../context/authContext'; // Import useAuth hook
import { db } from "../firebaseConfig/firebase";
import { MainHeader } from './MainHeader';
import { Footer } from "./Footer";
import { onAuthStateChanged, getAuth } from 'firebase/auth';


export const Contactos = () => {
  const [contacts, setContacts] = useState([]); // List of contacts
  const auth = useAuth(); // Use the useAuth hook to get the context
  const loggedInUserId = auth.user?.uid; // Access the user ID from the context

  const usuariosCollection = collection(db, 'usuarios');

  // Función para obtener los contactos
  const getContacts = async () => {
    // Filtro los contactos en base al ID del usuario logueado
    if (loggedInUserId) {
      const q = query(collection(usuariosCollection, 'contactos'), where('usuarioId', '==', loggedInUserId));
      const data = await getDocs(q);
      setContacts(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    } else {
      // Handle case where no user is logged in (optional)
      console.log("No user logged in, cannot fetch contacts");
      setContacts([]); // Clear contacts if no user
    }
  };

  // Función para eliminar un contacto
  const deleteContact = async (id) => {
    const contactDoc = doc(collection(usuariosCollection, 'contactos'), id);
    await deleteDoc(contactDoc);
  };

  // Consulta de borrado de contacto con un alerta de Sweetalert2
  const confirmDelete = (id) => {
    Swal.fire({
      title: '¿Estás seguro de eliminar este contacto?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteContact(id);
        Swal.fire({
          title: '¡Contacto eliminado!',
          text: '',
          icon: 'success',
        });
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

  const handleLogout = () => {
    try {
      auth.logout()
      navigate('/login'); // Redirect to the home page or desired route after logout
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Error al cerrar sesión: ' + error.message);
    }
  };


  return (
    <>
      <MainHeader />
      <div className="Contactos">
        <h1>Mis Contactos</h1>
        <Link to="/create">
          <Button variant="primary" className="mb-3">
            Crear Contacto
          </Button>
        </Link>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contacto) => (
              <tr key={contacto.id}>
                <td>{contacto.nombre}</td>
                <td>{contacto.email}</td>
                <td>{contacto.telefono}</td>
                <td>
                  <Link to={`/edit/${contacto.id}`}>
                    <Button variant="info" className="mr-2">
                      Editar
                    </Button>
                  </Link>
                  <Button variant="danger" onClick={() => confirmDelete(contacto.id)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
          <button onClick={()=>handleLogout()} className="btn brn-primary">Cerrar Sesión</button>
        </Table>
      </div>
      <Footer />
    </>
  );
};
