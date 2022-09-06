const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profiles = new Schema({
    uid: String,
    storeTitle: String,
    email: String,
    displayName: String,
    photoURL: String,
    homeBanner: String,
},{timestamps: true});

module.exports = mongoose.model('Profiles', profiles);