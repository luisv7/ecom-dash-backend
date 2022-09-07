// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');
const products = require('./controllers/products');
const profiles = require('./controllers/profiles');
const { getAuth } = require('firebase-admin/auth')
const admin = require('firebase-admin');
// const publicProducts = require('./controllers/publicProducts');

// Initialize App
const app = express();

// Configure Settings
require('dotenv').config();
const DATABASE_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT;
const PRIVATE_KEY_ID = process.env.PRIVATE_KEY_ID;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

// Firebase Configuration
admin.initializeApp({
  credential: admin.credential.cert({
    "type": "service_account",
    "project_id": "ecom-dash-53c9b",
    "private_key_id": PRIVATE_KEY_ID,
    "private_key": PRIVATE_KEY.replace(/\\n/g,'\n'),
    "client_email": "firebase-adminsdk-dropl@ecom-dash-53c9b.iam.gserviceaccount.com",
    "client_id": "101347785280572348973",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-dropl%40ecom-dash-53c9b.iam.gserviceaccount.com"
  })
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