const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { depletions } = require('../config/constants')

const inoutSchema = new Schema({
    meditem: {
        type: Schema.Types.ObjectId,
        ref: 'Meditem',
    },
    stock: {
        type: Schema.Types.ObjectId,
        ref: 'Stock'
    },
    inout: Number,
    date: Date,
    depletion: {
        type: String,
        enum: depletions
    },
    note: String
});

const Inout = mongoose.model('Inout', inoutSchema);

module.exports = Inout;
