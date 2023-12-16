const Meditem = require('../models/meditem')
const { families } = require('../config/constants')

const index = async (req, res) => {
    try {
        let meditems = await Meditem.find({}).sort('brandName')
        res.render('meditems/index', {
            title: 'Current Stock',
            meditems
        })
    } catch (err) {
        console.log(err)
        res.render('meditems/index', {
            title: 'Current Stock',
            errorMsg: err.message
        });
    }
}

const newMeditem = (req, res) => {
    res.render('meditems/new', {
        title: 'New Item',
        families,
    });
}

const create = async (req, res) => {
    try {
        await Meditem.create(req.body)
        res.redirect('/current')
    } catch (err) {
        console.log(err)
        res.render('meditems/new', {
            title: 'New Item',
            errorMsg: err.message
        });
    }
}

const show = async (req, res) => {
    const meditem = await Meditem.findById(req.params.id);

    const today = new Date();
    const sixMonthsLater = new Date(today.getFullYear(), today.getMonth() + 6, 1);
    const month = ('0' + (sixMonthsLater.getMonth() + 1)).slice(-2); 
    const year = sixMonthsLater.getFullYear();
    const futureDate = `${year}-${month}`;

    res.render('meditems/show', {
        title: 'Item Detail',
        meditem,
        futureDate
    });
}

const deleteItem = async (req, res) => {
    try {
        await Meditem.findByIdAndDelete(req.params.id)
        res.redirect('/current');
    } catch (err) {
        console.log(err);
        res.render('meditems/show', {
            title: 'Item Detail',
            errorMsg: err.message
        });
    }
}

const edit = async (req, res) => {
    const meditem = await Meditem.findById(req.params.id);
    
    res.render('meditems/edit', {
        title: 'Edit Item',
        meditem,
        families
    });
}

const update = async (req, res) => {
    try {
        await Meditem.update(req.params.id, req.body)
        res.redirect(`/current/${req.params.id}`)
    } catch (err) {
        console.log(err)
        res.render('meditems/show', {
            title: 'Item Detail',
            errorMsg: err.message
        });
    }
}

module.exports = {
    index,
    show,
    new: newMeditem,
    create,
    delete: deleteItem,
    edit,
    update
}