import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {MainHeader} from './MainHeader';
import { Footer } from './Footer';
import './Alerts.css';

const mySwal = withReactContent(Swal)

const schema = yup.object().shape({
  nombre: yup.string().trim().required('El nombre es requerido'),
  apellido: yup.string().trim().required('El apellido es requerido'),
  email: yup.string().trim().email('El email no es válido').required('El email es requerido'),
  mensaje: yup.string().trim().required('El mensaje es requerido')
});

export const Alerts = () => {
  const { register: alerts, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    console.log('Datos del formulario:', data);
    Swal.fire({
      text: "Se ha creado un contacto",
      icon: "success"
    });
    reset();
  };

  return (
    <>
    <MainHeader/>
    <div className="form-container">
      <h1>CREA TU CONTACTO</h1>
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" {...alerts('nombre')} />
          {errors.nombre && <p>{errors.nombre.message}</p>}
      </div>
      <div className="form-group">
          <label htmlFor="apellido">Apellido:</label>
          <input type="text" id="apellido" {...alerts('apellido')} />
          {errors.apellido && <p>{errors.apellido.message}</p>}
      </div>
      <div className="form-group">
          <label htmlFor="email">E-mail:</label>
          <input type="email" id="email" {...alerts('email')} />
          {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div className="form-group">
          <label htmlFor="mensaje">Mensaje:</label>
          <textarea type="text" id="mensaje" className='large-textarea' {...alerts('mensaje')} />
          {errors.mensaje && <p>{errors.mensaje.message}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="alerta">Emergencia</label>
        <select name="alertas" id="alertas">
        <option value="Salud">Salud</option>
        <option value="Seguridad">Seguridad</option>
        </select>
      </div>
        <button type="submit">Actualizar</button>
      </form>
    </div>
    <Footer/>
    </>
  );
}
