const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { families } = require('../config/constants')

const lotSchema = new Schema({
    lotNo: String,
    expDate: Date,
    stock: {
        type: Number,
        min: 0
    }
}, {
    timestamps: true
});

const meditemSchema = new Schema({
    brandName: String,
    genericName: String,
    dose: String,
    form: String,
    family: {
        type: String,
        enum: families
    },
    perUnit: String,
    parLevel: {
        type: Number,
        min: 0
    },
    quickRef: {
        type: Boolean,
        default: false
    },
    lots: [lotSchema],
    totalStock: Number,
    firstExp: Date,
    lastExp: Date,
    notes: String,
}, {
    timestamps: true
});

// MIDDLEWARE 
// (NOTE: only works when .save() is called, not .update() or findOneAndUpdate(), etc.)
meditemSchema.pre('save', function (next) {
    // Calculate meditem.totalStock
    this.totalStock = this.lots.reduce((sum, lot) => sum + (lot.stock || 0), 0);

    //Calculate meditem.firstExp and meditem.lastExp
    if (this.lots.length > 0) {
        const sortedLots = this.lots.slice().sort((a, b) => a.expDate - b.expDate);
        this.firstExp = sortedLots[0].expDate;
        this.lastExp = sortedLots[sortedLots.length - 1].expDate;
    } else {
        this.firstExp = null;
        this.lastExp = null;
    }

    next();
});


module.exports = mongoose.model('Meditem', meditemSchema)