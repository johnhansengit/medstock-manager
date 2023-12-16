const Meditem = require('../models/meditem')

const create = async (req, res) => {
    const meditem = await Meditem.findById(req.params.id);
    meditem.inStock.push(req.body);
    meditem.inStock.sort((a, b) => new Date(a.expDate) - new Date(b.expDate));

    try {
        await meditem.save();
    } catch (err) {
        console.log(err);
    }
    res.redirect(`/current/${meditem._id}`);
}

module.exports = {
    create,
}