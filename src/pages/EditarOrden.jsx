// src/pages/EditarOrden.jsx
import React from 'react';
import OrdenForm from '../components/OrdenForm';

const EditarOrden = () => {
  return (
    <div>
      <OrdenForm isEdit={true} />
    </div>
  );
};

export default EditarOrden;
