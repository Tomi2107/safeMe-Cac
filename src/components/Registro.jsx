import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const mySwal = withReactContent(Swal)

const schema = yup.object().shape({
  nombre: yup.string().trim().required('El nombre es requerido'),
  apellido: yup.string().trim().required('El apellido es requerido'),
  email: yup.string().trim().email('El email no es válido').required('El email es requerido'),
  contraseña: yup.string().trim().required('La contraseña es requerida'),
  contraseña2: yup.string().oneOf([yup.ref('contraseña'), null], 'Las contraseñas no coinciden').required('Debe repetir la contraseña')
});

const Registro = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    console.log('Datos del formulario:', data);
    Swal.fire({
      text: "Se ha creado un usuario",
      icon: "success"
    });
    reset();
  };

  return (
    <>
      <h1>CREA TU CUENTA</h1>
      <h2>Registra tus datos</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            {...register('nombre')}
          />
          {errors.nombre && <p>{errors.nombre.message}</p>}
        </div>
        <div>
          <label htmlFor="apellido">Apellido:</label>
          <input
            type="text"
            id="apellido"
            {...register('apellido')}
          />
          {errors.apellido && <p>{errors.apellido.message}</p>}
        </div>
        <div>
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            {...register('email')}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="contraseña">Contraseña:</label>
          <input
            type="password"
            id="contraseña"
            {...register('contraseña')}
          />
          {errors.contraseña && <p>{errors.contraseña.message}</p>}
        </div>
        <div>
          <label htmlFor="contraseña2">Repita contraseña:</label>
          <input
            type="password"
            id="contraseña2"
            {...register('contraseña2')}
          />
          {errors.contraseña2 && <p>{errors.contraseña2.message}</p>}
        </div>
        <button type="submit">Registrar</button>
      </form>
    </>
  );
};

export default Registro;