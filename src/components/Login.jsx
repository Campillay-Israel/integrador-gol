import React, { useState } from 'react';
import { signInWithEmailAndPassword } from '../components/firebase';
import { auth } from '../components/firebase';
import { TextField, Button, Container, Typography, Card, CardContent, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Usuario autenticado:', userCredential.user);
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <Card sx={{ maxWidth: 400, width: '100%', textAlign: 'center' }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Iniciar Sesión
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              label="Correo electrónico"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Iniciar Sesión
            </Button>
          </form>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2">
              ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;