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
        meditem.inStock.id(req.params.stockId).remove();
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

const edit = async (req, res) => {
    try {
        const meditem = await Meditem.findById(req.params.id);
        const stock = meditem.inStock.id(req.params.stockId);

        if (!stock) { throw new Error('Stock not found'); }

        res.render('/stock/edit', {
            title: 'Edit Stock',
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

const update = async (req, res) => {
    try {
        const meditem = await Meditem.findById(req.params.id);
        const stock = meditem.inStock.id(req.params.stockId);

        stockEntry.lotNo = req.body.lotNo;
        stockEntry.expDate = req.body.expDate;
        stockEntry.stock = req.body.stock;

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

module.exports = {
    create,
    delete: deleteStock,
    edit,
    update
}