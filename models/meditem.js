const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { families } = require('../config/constants')

const stockSchema = new Schema({
    lotNo: String,
    expDate: {
        type: Date,
        validate: {
            validator: function(value) {
                return value >= new Date();
            },
            message: 'Expiration date cannot be in the past.'
        }
    },
    stock: {
        type: Number,
        min: 0
    },
}, {
    timestamps: true
});

const meditemSchema = new Schema({
    genericName: {
        type: String,
        required: true
    },
    dose: String,
    form: String,
    family: {
        type: String,
        enum: families.map(family => family.name),
        required: true
    },
    perUnit: String,
    parLevel: {
        type: Number,
        min: 0
    },
    warningLevel: Number,
    quickRef: {
        type: Boolean,
        default: false
    },
    inStock: [stockSchema],
    firstExp: Date,
    lastExp: Date,
    notes: String,
}, {
    timestamps: true,
    toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// VIRTUAL PROPERTIES
meditemSchema.virtual('totalStock').get(function () {
    const today = new Date();
    return this.inStock
      .filter(stock => new Date(stock.expDate) >= today)
      .reduce((sum, stock) => sum + (stock.stock || 0), 0);
  });

meditemSchema.virtual('orderRec').get(function () {
    if (this.totalStock <= this.warningLevel) {
        return true;
    }
});
    

// MIDDLEWARE -- NOTE: only works when .save() is called, not .update() or findOneAndUpdate(), etc.)
meditemSchema.pre('save', function (next) {
    
    // Calculate meditem.firstExp and meditem.lastExp
    if (this.inStock.length > 0) {
        const sortedStock = this.inStock.slice().sort((a, b) => a.expDate - b.expDate);
        this.firstExp = sortedStock[0].expDate;
        this.lastExp = sortedStock[sortedStock.length - 1].expDate;
    } else {
        this.firstExp = null;
        this.lastExp = null;
    }

    // Calculate the meditem.warningLevel
    this.warningLevel = Math.max(Math.floor(this.parLevel * 1.2), this.parLevel + 1);

    next();
});

module.exports = mongoose.model('Meditem', meditemSchema)