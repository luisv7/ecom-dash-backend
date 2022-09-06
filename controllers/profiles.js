const Profiles = require('../models/profile');
const router = require('express').Router();

//Index
router.get('/', async (req, res) => {
    try {
        res.status(200).json(await Profiles.find({}));
    } catch (error) {
        res.status(400).json({message: 'bad request'})
    }
})

// Create
router.post('/', async (req, res) => {

    // Create User
    req.body.uid = req.user.uid;

    console.log(req.body);

    try {
        res.status(201).json(await Profiles.create(req.body))
    } catch (error) {
        res.status(400).json({message: 'bad request' })
    }
})

// Update
router.put('/', async (req, res) => {
    
    console.log(req.body.uid);

    try {
        res.status(200).json(await Profiles.find({uid: req.body.uid}))
    } catch (error) {
        res.status(400).json({message: 'bad request' })
    }
})

module.exports = router;