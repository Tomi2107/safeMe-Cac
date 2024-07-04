import { useState } from "react";

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    contraseña: "",
    contraseña2: "",
  });

  const [errores, setErrores] = useState({});
  const [registroExitoso, setRegistroExitoso] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const errores = validarFormulario(formData);
    if (Object.keys(errores).length === 0) {
      console.log("Datos del formulario:", formData);
      setFormData({
        nombre: "",
        apellido: "",
        email: "",
        contraseña: "",
        contraseña2: "",
      });
      setRegistroExitoso(true);
    } else {
      setErrores(errores);
    }
  };

  const validarFormulario = (values) => {
    let errores = {};
    if (!values.nombre.trim()) {
      errores.nombre = "El nombre es requerido";
    }
    if (!values.apellido.trim()) {
      errores.apellido = "El apellido es requerido";
    }
    if (!values.email.trim()) {
      errores.email = "El email es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errores.email = "El email no es válido";
    }
    if (!values.contraseña.trim()) {
      errores.contraseña = "La contraseña es requerida";
    }
    if (values.contraseña !== values.contraseña2) {
      errores.contraseña2 = "Las contraseñas no coinciden";
    }
    return errores;
  };

  return (
    <>
      <h1>CREA TU CUENTA</h1>
      <h2>Registra tus datos</h2>
      <form>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          name="nombre"
          id="nombre"
          value={formData.nombre}
          onChange={handleChange}
        />
        {errores.nombre && (
          <span style={{ color: "red" }}>{errores.nombre}</span>
        )}
        <br></br>
        <label htmlFor="apellido">Apellido:</label>
        <input
          type="text"
          name="apellido"
          id="apellido"
          value={formData.apellido}
          onChange={handleChange}
        />
        {errores.apellido && (
          <span style={{ color: "red" }}>{errores.apellido}</span>
        )}
        <br></br>
        <label htmlFor="email">E-mail:</label>
        <input
          type="text"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errores.email && <span style={{ color: "red" }}>{errores.email}</span>}
        <br></br>
        <label htmlFor="contraseña">Contraseña:</label>
        <input
          type="password"
          name="contraseña"
          id="contraseña"
          value={formData.contraseña}
          onChange={handleChange}
        />
        {errores.contraseña && (
          <span style={{ color: "red" }}>{errores.contraseña}</span>
        )}
        <br></br>
        <label htmlFor="contraseña2">Repita contraseña:</label>
        <input
          type="password"
          name="contraseña2"
          id="contraseña2"
          value={formData.contraseña2}
          onChange={handleChange}
        />
        {errores.contraseña2 && (
          <span style={{ color: "red" }}>{errores.contraseña2}</span>
        )}
        <br></br>
        <button onClick={onSubmit}>Registrar</button>
        {registroExitoso && <p>Se ha creado un usuario</p>}
      </form>
    </>
  );
};

export default Registro;
