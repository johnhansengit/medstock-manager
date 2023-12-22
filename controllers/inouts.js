const Inout = require('../models/inout')
const Meditem = require('../models/meditem')
const { depletions } = require('../config/constants')


const index = async (req, res) => {
  
  try {
      let inouts = await Inout.find({})
      .populate('meditem')
      .populate('user')
      .sort('dateTime')

      res.render('inouts/index', {
          title: 'Ins/Outs',
          inouts
      })
  } catch (err) {
      console.log(err)
      res.render('inouts/index', {
          title: 'Ins/Outs',
          errorMsg: err.message
      });
  }
}

const addStock = async (req, res) => {

  const meditem = await Meditem.findById(req.params.id);
  const stock = meditem.inStock.id(req.params.stockId);

  res.render('overlays/add-stock', {
    meditem,
    stock,
  });
}

const depleteStock = async (req, res) => {

  const meditem = await Meditem.findById(req.params.id);
  const stock = meditem.inStock.id(req.params.stockId);

  res.render('overlays/deplete-stock', {
    meditem,
    stock,
    depletions,
  });
}

const create = async (req, res) => {

  const meditem = await Meditem.findById(req.params.id);
  const stock = meditem.inStock.id(req.params.stockId);
  
  try {
    req.body.user = req.user._id;
    req.body.meditem = meditem;
    
    if (req.body.depletion) {
      const depletedStock = parseInt(req.body.inout, 10);
      stock.stock -= depletedStock;
    } else {
      const addedStock = parseInt(req.body.inout, 10);
      stock.stock += addedStock;
      req.body.addition = 'Received';
    }
    
    await Inout.create(req.body)
    await stock.save();
    await meditem.save();

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
  addStock,
  depleteStock,
  create
}