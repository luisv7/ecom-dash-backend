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

// Update
router.put('/:id', async (req, res) => {
    try {
        res.status(200).json(await Products.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // send new updated version of the object
        ))
    } catch (error) {
        res.status(400).json({message: 'bad request' })
    }
})

// Delete
router.delete('/:id', async (req,res) => {
    console.log(req.params.id)
    try {
        res.status(200).json(await Products.findByIdAndDelete(req.params.id))
    } catch (error) {
        res.status(400).json({message: 'bad request' })
    }
})

module.exports = router;