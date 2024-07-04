import { MainHeader } from "./MainHeader";
import { Footer } from "./Footer";

export const Principal = () => {
  return (
    <>
      <MainHeader />
      <main>
        <section className="principal__buttons">
          <button>Alerta Seguridad</button>
          <button>Alerta Salud</button>
        </section>
      </main>
      <Footer />
    </>
  );
};
