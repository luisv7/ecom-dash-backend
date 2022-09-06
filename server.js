// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');
const products = require('./controllers/products');
const profiles = require('./controllers/profiles');
const { getAuth } = require('firebase-admin/auth')
const admin = require('firebase-admin');
const serviceAccount = require('./firebase-private-key.json');
// const publicProducts = require('./controllers/publicProducts');

// Initialize App
const app = express();

// Configure Settings
require('dotenv').config();
const DATABASE_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT;

// Firebase Configuration
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Connect to MongoDB using Mongoose
mongoose.connect(DATABASE_URL);

// Middleware
app.use(cors());
app.use(logger('dev'));
app.use(express.json());

// Authorization Middleware
app.use(async function(req, res, next){
    try {
        const token = req.get('Authorization');
        if(token){
            const user = await getAuth().verifyIdToken(token.replace('Bearer ', ''));
            req.user = user;
        }else{
            req.user = null
        }
    } catch (error) {
        console.log(error)
    }
    next();
});

function isAuthenticated(req, res, next){
    if(req.user) return next();
    res.status(401).json({message: 'you must login'})
}

mongoose.connection
    .on('connected', () => console.log('Connected to MongoDB'))
    .on('error', (error) => console.log(error));

// Routes
app.get('/admin', (req, res) => {
    res.send();
});

app.use('/api/profiles', isAuthenticated, profiles);
app.use('/api/products', isAuthenticated, products);

// app.use('/api/public', publicProducts);

// Listener
app.listen(PORT, () => {console.log(`Listening on Port ${PORT}`)});