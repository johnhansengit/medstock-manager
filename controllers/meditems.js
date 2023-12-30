const Meditem = require('../models/meditem')
const { families } = require('../config/constants')

const index = async (req, res) => {
    try {
        let meditems = await Meditem.find({}).sort('genericName')
        res.render('meditems/index', {
            title: 'Current Stock',
            meditems,
            families
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

const search = async (req, res) => {
    console.log('Search controller activated')
    // try {
    //     console.log('Search controller tried')
    //     const searchQuery = req.query.search
    //     console.log(`searchQuery is ${searchQuery}`)

    //     let meditems = await Meditem.find({ "genericName": searchQuery });
    //     console.log(`meditems is ${meditems}`)

    //     res.render('meditems/index', {
    //         title: `Search Results: ${searchQuery}`,
    //         meditems,
    //         families
    //     });
    // } catch (err) {
    //     console.log(err)
    //     let meditems = await Meditem.find({}).sort('genericName')
    //     res.render('meditems/index', {
    //         title: 'Current Stock',
    //         meditems,
    //         families,
    //         errorMsg: "Item not found"
    //     });
    // }
}

module.exports = {
    index,
    show,
    new: newMeditem,
    create,
    delete: deleteItem,
    edit,
    update,
    search
}