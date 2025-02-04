const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Habilita CORS
app.use(cors());

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

module.exports = app;