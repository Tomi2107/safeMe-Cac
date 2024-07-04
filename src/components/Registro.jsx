const Registro = ()=> {

    return (
        <>
        <h1>CREA TU CUENTA</h1>
        <h2>Registra tus datos</h2>
        <form /* onSubmit={handleSubmit} */>
          <label for="nombre">Nombre:</label>
          <input
            type="text"
            name="nombre"
            id="nombre"
          /><br></br>
          <label for="apellido">Apellido:</label>
          <input
            type="text"
            name="apellido"
            id="apellido"
          /><br></br>
          <label for="email">E-mail:</label>
          <input
            type="text"
            name="email"
            id="email"
          /><br></br>
          <label for="contraseña">Contraseña:</label>
          <input
            type="text"
            name="contraseña"
            id="contraseña"
          /><br></br>
          <label for="contraseña2">Repita contraseña:</label>
          <input
            type="text"
            name="contraseña2"
            id="contraseña2"
          /><br></br>
        <button type="submit">Registrar</button>
      </form>
      </>
    );
}

export default Registro