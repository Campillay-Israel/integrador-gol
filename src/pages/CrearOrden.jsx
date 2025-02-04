// src/pages/CrearOrden.jsx
import React from 'react';
import OrdenForm from '../components/OrdenForm';

const CrearOrden = () => {
  return (
    <div>
      <OrdenForm isEdit={false} />
    </div>
  );
};

export default CrearOrden;
