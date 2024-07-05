export const Perfil = () => {
  return (
    <>
      <div className="form-container">
        <form action="">
          <h1>PERFIL</h1>
          <h2>Completa tus datos</h2>
          <label htmlFor="nombre">Documento:</label>
          <input type="text" id="documento" />
          <label htmlFor="fechaNacimiento">Fecha de nacimiento:</label>
          <input type="date" id="fechaNacimiento" />
          <label htmlFor="tipoSangre">Tipo de sangre:</label>
          <select id="tipoSangre" name="tipoSangre">
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
          <label htmlFor="enfermedades">Enfermedades:</label>
          <input type="text" id="enfermedades" />
          <label htmlFor="alergias">Alergias:</label>
          <input type="text" id="alergias" />
          <label htmlFor="notas">Otras notas médicas:</label>
          <textarea type="text" id="notas" />
          <button type="submit">Completar</button>
        </form>
      </div>
    </>
  );
};
