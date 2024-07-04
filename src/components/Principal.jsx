import { MainHeader } from "./MainHeader";
import { MainFooter } from "./MainFooter";

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
      <MainFooter />
    </>
  );
};
