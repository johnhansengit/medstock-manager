const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { families } = require('../config/constants')

const stockSchema = new Schema({
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
    inStock: [stockSchema],
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
    this.totalStock = this.inStock.reduce((sum, stock) => sum + (stock.stock || 0), 0);

    //Calculate meditem.firstExp and meditem.lastExp
    if (this.inStock.length > 0) {
        const sortedStock = this.inStock.slice().sort((a, b) => a.expDate - b.expDate);
        this.firstExp = sortedStock[0].expDate;
        this.lastExp = sortedStock[sortedStock.length - 1].expDate;
    } else {
        this.firstExp = null;
        this.lastExp = null;
    }

    next();
});


module.exports = mongoose.model('Meditem', meditemSchema)