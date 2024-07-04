import { useState } from "react";

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    contraseña: "",
    contraseña2: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = (e)=> {
    e.preventDefault();
    console.log(formData)
  }

  return (
    <>
      <h1>CREA TU CUENTA</h1>
      <h2>Registra tus datos</h2>
      <form /* onSubmit={handleSubmit} */>
        <label htmlFor ="nombre">Nombre:</label>
        <input
          type="text"
          name="nombre"
          id="nombre"
          value={formData.nombre}
          onChange={handleChange}
        />
        <br></br>
        <label htmlFor ="apellido">Apellido:</label>
        <input
          type="text"
          name="apellido"
          id="apellido"
          value={formData.apellido}
          onChange={handleChange}
        />
        <br></br>
        <label htmlFor ="email">E-mail:</label>
        <input
          type="text"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
        <br></br>
        <label htmlFor ="contraseña">Contraseña:</label>
        <input
          type="text"
          name="contraseña"
          id="contraseña"
          value={formData.contraseña}
          onChange={handleChange}
        />
        <br></br>
        <label htmlFor ="contraseña2">Repita contraseña:</label>
        <input
          type="text"
          name="contraseña2"
          id="contraseña2"
          value={formData.contraseña2}
          onChange={handleChange}
        />
        <br></br>
{/*         <input onClick={onSubmit} value="Registrar"/> */}
        <button onClick={onSubmit}>Registrar</button>
      </form>
    </>
  );
};

export default Registro;
