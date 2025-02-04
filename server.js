require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Habilita CORS
app.use(cors());
app.use(express.json());

const API_URL = process.env.API_URL;

// Ruta para obtener las órdenes
app.get('/api/ordenes', async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/ordenes`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los datos' });
  }
});

// Ruta para crear una orden
app.post('/api/ordenes', async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/ordenes`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la orden' });
  }
});

module.exports = app; // ⚠️ Elimina app.listen()
