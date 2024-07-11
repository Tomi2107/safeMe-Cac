import { MainHeader } from "./MainHeader";
import { Footer } from "./Footer";
import emailjs from "emailjs-com"
import { useEffect } from "react";
import { db } from "../firebaseConfig/firebase.js";
import { doc, getDoc } from "firebase/firestore";
import "./Principal.css";
import { string } from "yup";

export const Principal = () => {

  const alertaSeguridad = {
    contactoId : "",
    nombre : "",
    email : "",
    mensaje : ""
  };

  const alertaSalud = {
    contactoId : "",
    nombre : "",
    email : "",
    mensaje : ""
  };
  
  // Acciones al cargar el componente
  useEffect(() => {
    const getAlerts = async () => {
      // obtengo alerta de seguridad
      const AlertaSeguridadDoc = await getDoc(doc(db, "mensajesAlertaSeguridad", "3drDVrXKl0I6Aa7vVKn9")); //todo: tomar el 1o, sin usar la key del 1o
      alertaSeguridad.contactoId = AlertaSeguridadDoc.data().contactoId;
      alertaSeguridad.mensaje = AlertaSeguridadDoc.data().mensaje;
      // obtengo alerta de salud
      const AlertaSaludDoc = await getDoc(doc(db, "mensajesAlertaSalud", "oJbxfkuYjQu7tIWSJpkm"));  //todo: tomar el 1o, sin usar la key del 1o
      alertaSalud.contactoId = AlertaSaludDoc.data().contactoId;
      alertaSalud.mensaje = AlertaSaludDoc.data().mensaje;
      // obtengo contacto seguridad
      const contactoSeguridadDoc = await getDoc(doc(db, "contactos", alertaSeguridad.contactoId));
      alertaSeguridad.nombre = contactoSeguridadDoc.data().nombre + " " + contactoSeguridadDoc.data().apellido;
      alertaSeguridad.email = contactoSeguridadDoc.data().email;
      // obtengo contacto salud
      const contactoSaludDoc = await getDoc(doc(db, "contactos", alertaSalud.contactoId));
      alertaSalud.nombre = contactoSaludDoc.data().nombre + " " + contactoSaludDoc.data().apellido;
      alertaSalud.email = contactoSaludDoc.data().email;
    };
    // inicializo sistema de mails con la public key dada de alta en el servicio emailjs
    emailjs.init("z4Y3ZaHQXif-4Hz2M");
    getAlerts();
    console.log(alertaSeguridad, alertaSalud);
  }, []);

  const handleSecurityAlert = (e) => {
    e.preventDefault();   
    console.log("issue security alert");
    sendEmail(
      alertaSeguridad.nombre,
      alertaSeguridad.email, 
      alertaSeguridad.mensaje,
      'template_securityAlert'
    );
  }

  const handleHealthAlert = (e) => {
    e.preventDefault();    
    console.log("issue health alert")
    sendEmail(
      alertaSalud.nombre,
      alertaSalud.email, 
      alertaSalud.mensaje,
      'template_healthAlert'
    );
}

  function sendEmail(nombre, email, mensaje, template) {

    const templateParams = {
      name: "mi contacto - name",
      recipient: email,
      to_email: email,
      to_name: nombre,
      from_name: "<usuario logueado>", //todo: colocar nombre + apellido de usuario logueado
      message: mensaje 
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
