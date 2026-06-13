const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(err => console.error('Error:', err));

const CotizacionSchema = new mongoose.Schema({
  cliente: String,
  evento: String,
  fecha: String,
  paquete: String,
  ubicacion: String,
  telefono: String,
  estado: String
});

const Cotizacion = mongoose.model('Cotizacion', CotizacionSchema);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/cotizaciones', async (req, res) => {
  try {
    const cotizaciones = await Cotizacion.find().sort({ fecha: 1 });
    res.json(cotizaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/cotizaciones', async (req, res) => {
  try {
    const nuevaCotizacion = new Cotizacion(req.body);
    await nuevaCotizacion.save();

    res.json({
      mensaje: 'Cotización registrada',
      nuevaCotizacion
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/cotizaciones/:id', async (req, res) => {
  try {
    const cotizacionActualizada = await Cotizacion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      mensaje: 'Cotización actualizada',
      cotizacionActualizada
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/cotizaciones/:id', async (req, res) => {
  try {
    await Cotizacion.findByIdAndDelete(req.params.id);

    res.json({
      mensaje: 'Cotización eliminada'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor activo en puerto ${PORT}`);
});