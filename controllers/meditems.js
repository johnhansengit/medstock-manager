const Meditem = require('../models/meditem')
const { families } = require('../config/constants')

const index = async (req, res) => {
    try {
        let meditems
        let starChecked
        if (req.query.search) {
            let search = req.query.search;
            let query = { $or: [] };
            const fields = ['genericName', 'family', 'dose', 'form']

            fields.forEach(field => {
                query.$or.push({ [field]: { $regex: search, $options: 'i' } });
            })
            meditems = await Meditem.find(query).sort('genericName')
        } else if (req.query.quickRefFilter) {
            let quickRefIsTrue = req.query.quickRefFilter
            if (quickRefIsTrue === 'on') {
                meditems = await Meditem.find({ quickRef: true }).sort('genericName')
                starChecked = true;
            } else {
                meditems = await Meditem.find({}).sort('genericName')
                starChecked = false;
            }
        } else {
            meditems = await Meditem.find({}).sort('genericName')
        }
        res.render('meditems/index', {
            title: 'Current Stock',
            meditems,
            families,
            starChecked
        })
    } catch (err) {
        console.log(err)
        let meditems = await Meditem.find({}).sort('genericName')
        res.render('meditems/index', {
            title: 'Current Stock',
            meditems,
            families,
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
        // Convert 'quickRef' from string to Boolean
        req.body.quickRef = req.body.quickRef === 'on';

        await Meditem.create(req.body)
        res.redirect('/current')
    } catch (err) {
        console.log(err)
        let meditems = await Meditem.find({}).sort('genericName')
        res.render('meditems/index', {
            title: 'Current Stock',
            meditems,
            families,
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
        families,
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
        // Convert 'quickRef' from string to Boolean
        req.body.quickRef = req.body.quickRef === 'on';

        await Meditem.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/current')
    } catch (err) {
        console.log(err)
        let meditems = await Meditem.find({}).sort('genericName')
        res.render('meditems/index', {
            title: 'Current Stock',
            meditems,
            families,
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