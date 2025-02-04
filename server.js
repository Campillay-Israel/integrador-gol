const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();

// Habilita CORS
app.use(cors());

// Sirve los archivos estáticos de React
app.use(express.static(path.join(__dirname, 'build')));

// Ruta para obtener las órdenes
app.get('/api/ordenes', async (req, res) => {
  try {
    const response = await axios.get('https://api-gol-integrador.vercel.app/api/ordenes');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los datos' });
  }
});

// Ruta para crear una orden
app.post('/api/ordenes', async (req, res) => {
  try {
    const response = await axios.post('https://api-gol-integrador.vercel.app/api/ordenes', req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la orden' });
  }
});

// Ruta para servir index.html en la raíz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Inicia el servidor
const PORT = 3001;
app.listen(PORT, () => {
 console.log(`Servidor proxy corriendo en http://localhost:${PORT}`);
});


module.exports = app;