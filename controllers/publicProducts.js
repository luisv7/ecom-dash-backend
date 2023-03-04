// Dependencies
const PublicProduct = require('../models/publicProduct');
const router = require('express').Router();

// Routes INDUCES

// Index
router.get('/', async (req, res) => {
    try {
        res.status(200).json(await PublicProduct.find({}));
    } catch (error) {
        res.status(400).json({message: 'bad request'})
    }
})

module.exports = router;