const Meditem = require('../models/meditem')
const { families } = require('../config/constants')

const index = async (req, res) => {
    try {
        let meditems = await Meditem.find({}).sort('family')
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
    res.render('overlays/new', {
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
    const sixMonthsLater = new Date(today.getFullYear(), today.getMonth() + 6, 0);
    const month = ('0' + (sixMonthsLater.getMonth() + 1)).slice(-2); 
    const year = sixMonthsLater.getFullYear();
    const day = ('0' + sixMonthsLater.getDate()).slice(-2); 
    const futureDate = `${year}-${month}-${day}`;     

    res.render('overlays/item', {
        meditem,
        futureDate
    });
}

const deleteItem = async (req, res) => {
    try {
        await Meditem.findByIdAndDelete(req.params.id)
        res.status(200).send();
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
}

const edit = async (req, res) => {
    const meditem = await Meditem.findById(req.params.id);
    
    res.render('overlays/edit', {
        title: 'Edit Item',
        meditem,
        families
    });
}

const update = async (req, res) => {
    try {
        await Meditem.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/current')
    } catch (err) {
        console.log(err)
        let meditems = await Meditem.find({}).sort('family')
        res.render('meditems/index', {
            title: 'Current Stock',
            meditems,
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