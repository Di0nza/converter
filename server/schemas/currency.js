const mongoose = require('mongoose')

const currencySchema = new mongoose.Schema({
    abbreviation: { type: String, require: true},
    name: {type: String, require: true},
    scale: {type: Number, require: true},
    rate: {type: String, require: true},
    update: {type: Date, default: Date.now}
}, {toJSON: {virtuals:true}});

const Currency = mongoose.model('currency', currencySchema);

module.exports = {Currency}