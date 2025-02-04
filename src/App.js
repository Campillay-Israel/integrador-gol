import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { auth } from './components/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import OrdenesList from './components/OrdenesList';
import CreateOrden from './components/CreateOrden';
import EditOrden from './components/EditOrden';
import OrdenDetail from './components/OrdenDetail';
import {
  Typography,
  Card,
  Box,
  CircularProgress,
} from '@mui/material';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Estado para manejar la carga inicial

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Actualizar el estado del usuario
      setLoading(false); // Indicar que la carga inicial ha terminado
    });

    return () => unsubscribe(); // Limpiar la suscripción al desmontar el componente
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Card sx={{ padding: 3, textAlign: 'center' }}>
          <CircularProgress />
          <Typography mt={2}>Cargando...</Typography>
        </Card>
      </Box>
    );
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Redirigir al inicio si el usuario ya está autenticado */}
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        {/* Rutas protegidas */}
        <Route
          path="/"
          element={user ? <OrdenesList /> : <Navigate to="/login" />}
        />
        <Route
          path="/create"
          element={user ? <CreateOrden /> : <Navigate to="/login" />}
        />
        <Route
          path="/edit/:id"
          element={user ? <EditOrden /> : <Navigate to="/login" />}
        />
        <Route
          path="/ordenes/:id"
          element={user ? <OrdenDetail /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;