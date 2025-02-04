// src/components/OrdenForm.jsx
import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createOrden, fetchOrdenById, updateOrden } from '../features/ordenes/ordenesSlice';
import { useNavigate, useParams } from 'react-router-dom';

const OrdenForm = ({ isEdit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const ordenDetail = useSelector((state) => state.ordenes.detalle);

  const [form, setForm] = useState({
    destino: '',
    contenido: '',
    estado: 'Pendiente',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEdit && id) {
      dispatch(fetchOrdenById(id));
    }
  }, [dispatch, isEdit, id]);

  useEffect(() => {
    if (isEdit && ordenDetail) {
      setForm({
        destino: ordenDetail.destino,
        contenido: ordenDetail.contenido,
        estado: ordenDetail.estado,
      });
    }
  }, [isEdit, ordenDetail]);

  const validate = () => {
    const newErrors = {};
    if (form.destino.length < 5) {
      newErrors.destino = 'El destino debe tener al menos 5 caracteres.';
    }
    if (!form.contenido) {
      newErrors.contenido = 'El contenido es obligatorio.';
    }
    if (!['Pendiente', 'En tránsito', 'Entregado'].includes(form.estado)) {
      newErrors.estado = 'Estado inválido.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (isEdit) {
      dispatch(updateOrden({ id, orden: form }))
        .unwrap()
        .then(() => navigate(`/orden/${id}`))
        .catch((err) => alert('Error al actualizar la orden.'));
    } else {
      dispatch(createOrden(form))
        .unwrap()
        .then(() => navigate('/'))
        .catch((err) => alert('Error al crear la orden.'));
    }
  };

  return (
    <Paper style={{ padding: '20px', marginTop: '20px' }}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Destino"
          name="destino"
          value={form.destino}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.destino}
          helperText={errors.destino}
        />
        <TextField
          label="Contenido"
          name="contenido"
          value={form.contenido}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.contenido}
          helperText={errors.contenido}
        />
        <TextField
          select
          label="Estado"
          name="estado"
          value={form.estado}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.estado}
          helperText={errors.estado}
        >
          <MenuItem value="Pendiente">Pendiente</MenuItem>
          <MenuItem value="En tránsito">En tránsito</MenuItem>
          <MenuItem value="Entregado">Entregado</MenuItem>
        </TextField>
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
          {isEdit ? 'Actualizar Orden' : 'Crear Orden'}
        </Button>
      </form>
    </Paper>
  );
};

export default OrdenForm;
