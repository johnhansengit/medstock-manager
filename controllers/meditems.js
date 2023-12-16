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
        })
    }
}

const newMeditem = (req, res) => {
    res.render('meditems/new', {
        title: 'New Item',
        families,
        errorMsg: ''
    })
}

const create = async (req, res) => {
    try {
        await Meditem.create(req.body)
        res.redirect('/meditems')
    } catch (err) {
        console.log(err)
        res.render('meditems/new', {
            title: 'New Item',
            errorMsg: err.message
        })
    }
}

module.exports = {
    new: newMeditem,
    create,
    index,
}