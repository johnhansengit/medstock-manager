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

const deleteStock = async (req, res) => {
    try {
        const meditem = await Meditem.findById(req.params.id);
        const stock = meditem.inStock.id(req.params.stockId);

        if (!stock) {
            return res.status(404).send('Stock not found');
        }

        meditem.inStock = meditem.inStock.filter(stock => stock._id.toString() !== req.params.stockId);
        await meditem.save();
        res.status(200).send();
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
};


const update = async (req, res) => {
    try {
        const meditem = await Meditem.findById(req.params.id);
        const stock = meditem.inStock.id(req.params.stockId);

        stock.stock = req.body.stock;

        await meditem.save();

        res.redirect(`/current/${meditem._id}`);
    } catch (err) {
        console.log(err);
        res.render('meditems/show', {
            title: 'Item Detail',
            errorMsg: err.message
        });
    }
}

const add = async (req, res) => {
    try {
        const meditem = await Meditem.findById(req.params.id);
        const stock = meditem.inStock.id(req.params.stockId);

        if (!stock) { throw new Error('Stock not found'); }

        res.render('stock/add', {
            title: 'Add Stock',
            meditem,
            stock
        });
    } catch (err) {
        console.log(err)
        res.render('meditems/show', {
            title: 'Item Detail',
            errorMsg: err.message
        });
    }
}

const deplete = async (req, res) => {
    try {
        const meditem = await Meditem.findById(req.params.id);
        const stock = meditem.inStock.id(req.params.stockId);

        if (!stock) { throw new Error('Stock not found'); }

        res.render('stock/deplete', {
            title: 'Deplete Stock',
            meditem,
            stock
        });
    } catch (err) {
        console.log(err)
        res.render('meditems/show', {
            title: 'Item Detail',
            errorMsg: err.message
        });
    }
}

module.exports = {
    create,
    delete: deleteStock,
    update,
    add,
    deplete
}