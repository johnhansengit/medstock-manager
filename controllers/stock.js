const Meditem = require('../models/meditem')
const Inout = require('../models/inout')

const create = async (req, res) => {
    try {
        const meditem = await Meditem.findById(req.params.id);
        meditem.inStock.push(req.body);
        meditem.inStock.sort((a, b) => new Date(a.expDate) - new Date(b.expDate));
        await meditem.save();

        const newStock = meditem.inStock[meditem.inStock.length - 1];

        const inout = new Inout({
            user: req.user._id, 
            meditem: meditem._id,
            stock: newStock._id,
            inout: req.body.stock,  
            addition: 'Received',
            updatedStock: meditem.totalStock
        });

        await inout.save();

    } catch (err) {
        console.log(err);
    }
    res.redirect(`/current/`);
}

module.exports = {
    create,
}