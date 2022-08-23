// Dependencies
const Products = require('../models/product');
const router = require('express').Router();

// Routes INDUCES

// Index
router.get('/', async (req, res) => {
    try {
        res.status(200).json(await Products.find({}));
    } catch (error) {
        res.status(400).json({message: 'bad request'})
    }
})

// Create
router.post('/', async (req, res) => {
    try {
        res.status(201).json(await Products.create(req.body))
    } catch (error) {
        res.status(400).json({message: 'bad request' })
    }
})

module.exports = router;