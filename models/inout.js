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
                return value !== 0;
            },
            message: 'In-out value cannot be zero'
        }
    },
    dateTime: Date,
    depletion: {
        type: String,
        enum: depletions
    },
    note: String
});

const Inout = mongoose.model('Inout', inoutSchema);

module.exports = Inout;
