const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { depletions } = require('../config/constants');

const inoutSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    meditem: {
        type: Schema.Types.ObjectId,
        ref: 'Meditem',
    },
    stock: {
        type: Schema.Types.ObjectId,
        ref: 'Stock'
    },
    inout: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return value > 0;
            },
            message: 'Value must be greater than zero'
        }
    },
    dateTime: {
        type: Date,
        default: Date.now
    },
    depletion: {
        type: String,
        enum: depletions
    },
    addition: String,
    note: String
});

const Inout = mongoose.model('Inout', inoutSchema);

module.exports = Inout;
