import { MainHeader } from "./MainHeader";
import { Footer } from "./Footer";
import emailjs from "emailjs-com"
import { useEffect } from "react";
import "./Principal.css";

export const Principal = () => {

  useEffect(() => emailjs.init("z4Y3ZaHQXif-4Hz2M"), []);

  const handleSecurityAlert = (e) => {
    e.preventDefault();   
    console.log("issue security alert")
    sendEmail()
  }

  const handleHealthAlert = (e) => {
    e.preventDefault();    
    console.log("issue health alert")
    sendEmail()
  }

  function sendEmail() {

    const templateParams = {
      name: "mi contacto - name",
      recipient: "cristianpazmezzano@gmail.com",
      to_email: "cristianpazmezzano@gmail.com",
      to_name: "mi contacto - to_name",
      from_name: "safeMe",
      message: "Alerta" 
    }
    emailjs.send('service_safeMe', 'template_securityAlert', templateParams)
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
            <img className="principal__button" src="./src/assets/crisis_alert_48dp.png" alt="Alerta Seguridad" onClick={handleSecurityAlert}/>
            <img className="principal__button" src="./src/assets/health_and_safety_48dp.png" alt="Alerta Salud" onClick={handleHealthAlert}/>
        </section>
      </main>
      <Footer />
    </>
  );
};
