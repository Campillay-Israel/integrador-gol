import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addOrden } from '../store/ordenesSlice';
import { TextField, Button, Container, Typography, MenuItem, Select, FormControl, InputLabel, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { auth } from '../components/firebase';


const CreateOrden = () => {
  const [destino, setDestino] = useState('');
  const [contenido, setContenido] = useState('');
  const [estado, setEstado] = useState('Pendiente');
  const [errors, setErrors] = useState({ destino: false, contenido: false });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Validaciones
    const newErrors = {
      destino: destino.trim() === '',
      contenido: contenido.trim() === '',
    };
  
    if (newErrors.destino || newErrors.contenido) {
      setErrors(newErrors);
      return;
    }
  
    // Obtener el usuario actual
    const user = auth.currentUser;
  
    // Si no hay errores, enviar la orden con el usuario que la creó
    dispatch(addOrden({
      destino,
      contenido,
      estado,
      creadoPor: user ? user.email : 'Anónimo', // Registrar quién creó la orden
    }));
    navigate('/');
  };

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <Card sx={{ maxWidth: 400, width: '100%', textAlign: 'center' }}>
        <CardContent>
        <Typography variant="h4" gutterBottom>
            Crear Nueva Orden
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Destino"
              value={destino}
              onChange={(e) => {
                setDestino(e.target.value);
                setErrors((prev) => ({ ...prev, destino: false }));
              }}
              fullWidth
              margin="normal"
              error={errors.destino}
              helperText={errors.destino ? 'El destino no puede estar vacío' : ''}
            />
            <TextField
              label="Contenido"
              value={contenido}
              onChange={(e) => {
                setContenido(e.target.value);
                setErrors((prev) => ({ ...prev, contenido: false }));
              }}
              fullWidth
              margin="normal"
              error={errors.contenido}
              helperText={errors.contenido ? 'El contenido no puede estar vacío' : ''}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="estado-label">Estado</InputLabel>
              <Select
                labelId="estado-label"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                label="Estado"
              >
                <MenuItem value="Pendiente">Pendiente</MenuItem>
                <MenuItem value="En tránsito">En tránsito</MenuItem>
                <MenuItem value="Entregado">Entregado</MenuItem>
              </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Crear
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CreateOrden;