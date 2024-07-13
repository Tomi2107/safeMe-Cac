import { MainHeader } from "./MainHeader";
import { Footer } from "./Footer";
import emailjs from "emailjs-com"
import { useEffect } from "react";
import { db } from "../firebaseConfig/firebase.js";
import { doc, getDoc, getDocs, query, collection, where } from "firebase/firestore";
import { useAuth } from '../context/authContext'; // Importo useAuth hook

import "./Principal.css";

export const Principal = () => {

  // trae usuario logueado
  const auth = useAuth(); // Uso el useAuth hook
  const { user } = useAuth(); // Asumo que el objeto user esta disponible en useAuth
  const userId = user?.uid; // Extraigo el user ID si el usuario existe
  const userName = user?.nombre + user?.apellido;

  const alertaSeguridad = {
    contactoId : "",
    nombreDesde : "",
    nombrePara : "",
    email : "",
    mensaje : ""
  };

  const alertaSalud = {
    contactoId : "",
    nombreDesde : "",
    nombrePara: "",
    email : "",
    mensaje : ""
  };
  
  // Acciones al cargar el componente
  useEffect(() => {
    const getAlerts = async (userId) => {
      // obtengo nombre de usuario logueado
      const userRef = doc(db, "usuarios", userId);
      const docSnap = await getDoc(userRef);
      alertaSeguridad.nombreDesde = docSnap.data().nombre + " " + docSnap.data().apellido;
      alertaSalud.nombreDesde = docSnap.data().nombre + " " + docSnap.data().apellido;
      // obtengo alerta de seguridad
      const dataSeg = await getDocs(query(collection(db, "mensajesAlertaSeguridad"), where("usuarioId", "==", userId)));
      alertaSeguridad.contactoId = dataSeg.docs[0].data().contactoId;
      alertaSeguridad.mensaje = dataSeg.docs[0].data().mensaje;
      // obtengo alerta de salud
      const dataSal = await getDocs(query(collection(db, "mensajesAlertaSalud"), where("usuarioId", "==", userId)));
      alertaSalud.contactoId = dataSal.docs[0].data().contactoId;
      alertaSalud.mensaje = dataSal.docs[0].data().mensaje;
      // obtengo contacto seguridad
      const contactoSeguridadDoc = await getDoc(doc(db, "contactos", alertaSeguridad.contactoId));
      alertaSeguridad.nombrePara = contactoSeguridadDoc.data().nombre + " " + contactoSeguridadDoc.data().apellido;
      alertaSeguridad.email = contactoSeguridadDoc.data().email;
      // obtengo contacto salud
      const contactoSaludDoc = await getDoc(doc(db, "contactos", alertaSalud.contactoId));
      alertaSalud.nombrePara = contactoSaludDoc.data().nombre + " " + contactoSaludDoc.data().apellido;
      alertaSalud.email = contactoSaludDoc.data().email;
    };
    // inicializo sistema de mails con la public key dada de alta en el servicio emailjs
    emailjs.init("z4Y3ZaHQXif-4Hz2M");
    // trae configuración de alertas del usuario logueado
    console.log("usuario logueado: ", userId, userName)
    if (userId) {
      getAlerts(userId);
      console.log(alertaSeguridad, alertaSalud);
    }
  }, [userId]);

  const handleSecurityAlert = (e) => {
    e.preventDefault();   
    console.log("issue security alert");
    sendEmail(alertaSeguridad,'template_securityAlert');
  }

  const handleHealthAlert = (e) => {
    e.preventDefault();    
    console.log("issue health alert")
    sendEmail(alertaSalud,'template_healthAlert');
}

  function sendEmail(alerta, template) {

    const templateParams = {
      name: "mi contacto - name",
      recipient: alerta.email,
      to_email: alerta.email,
      to_name: alerta.nombreDesde,
      from_name: alerta.nombrePara,
      message: alerta.mensaje
    }
    emailjs.send('service_safeMe', template, templateParams)
      .then((result) => {
        console.log("mail sent")
      }, (error) => {
        console.log(error.text);
      });
  }
  
  return (
    <>
      <MainHeader />
      <main>
        <section className="principal__buttons">
            <img className="principal__button" src="/assets/crisis_alert_48dp.svg" alt="Alerta Seguridad" onClick={handleSecurityAlert}/>
            <img className="principal__button" src="/assets/health_and_safety_48dp.png" alt="Alerta Salud" onClick={handleHealthAlert}/>
        </section>
      </main>
      <Footer />
    </>
  );
};
