const Meditem = require('../models/meditem')

const index = async (req, res) => {
  
    let meditems = await Meditem.find({})

    try {
        res.render('order/index', {
            title: 'Ordering',
            meditems
        })
    } catch (err) {
        console.log(err)
        res.render('order/index', {
            title: 'Ordering',
            meditems,
            errorMsg: err.message
        });
    }
}

module.exports = {
  index
}