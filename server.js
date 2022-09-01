// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');
const products = require('./controllers/products');

// Initialize App
const app = express();

// Configure Settings
require('dotenv').config();
const DATABASE_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT;

// Connect to MongoDB using Mongoose
mongoose.connect(DATABASE_URL);

// Middleware
app.use(cors());
app.use(logger('dev'));
app.use(express.json());

mongoose.connection
    .on('connected', () => console.log('Connected to MongoDB'))
    .on('error', (error) => console.log(error));

// Routes
app.get('/', (req, res) => {
    res.send();
});

app.use('/api/products', products);

// Listener
app.listen(PORT, () => {console.log(`Listening on Port ${PORT}`)});