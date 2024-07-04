const Registro = ()=> {

    return (
        <>
        <form /* onSubmit={handleSubmit} */>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
          />
          <label>Apellido:</label>
          <input
            type="text"
            name="apellido"
          />
          <label>E-mail:</label>
          <input
            type="text"
            name="email"
          />
          <label>Contraseña:</label>
          <input
            type="text"
            name="contraseña"
          />
          <label>Repita contraseña:</label>
          <input
            type="text"
            name="contraseña2"
          />
        <button type="submit">Registrar</button>
      </form>
      </>
    );
}

export default Registro