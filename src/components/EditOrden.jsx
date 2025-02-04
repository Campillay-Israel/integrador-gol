import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateOrden } from '../store/ordenesSlice';
import { TextField, Button, Container, Typography, MenuItem, Select, FormControl, InputLabel, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { auth } from '../components/firebase';
const EditOrden = () => {
  const { id } = useParams();
  const orden = useSelector(state => state.ordenes.items.find(orden => orden._id === id));
  const [destino, setDestino] = useState('');
  const [contenido, setContenido] = useState('');
  const [estado, setEstado] = useState('Pendiente');
  const [errors, setErrors] = useState({ destino: false, contenido: false });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (orden) {
      setDestino(orden.destino);
      setContenido(orden.contenido);
      setEstado(orden.estado);
    }
  }, [orden]);

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
  
    // Si no hay errores, actualizar la orden con el usuario que la modificó
    dispatch(updateOrden({
      id,
      destino,
      contenido,
      estado,
      modificadoPor: user ? user.email : 'Anónimo', // Registrar quién modificó la orden
    }));
    navigate('/');
  };

  if (!orden) return <Typography>Cargando...</Typography>;

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <Card sx={{ maxWidth: 400, width: '100%', textAlign: 'center' }}>
        <CardContent>
        <Typography variant="h4" gutterBottom>
            Editar Orden
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
              Actualizar
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default EditOrden;