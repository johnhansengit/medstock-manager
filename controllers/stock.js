const Meditem = require('../models/meditem')
const Inout = require('../models/inout')

const create = async (req, res) => {
    try {
        const meditem = await Meditem.findById(req.params.id);
        meditem.inStock.push(req.body);
        meditem.inStock.sort((a, b) => new Date(a.expDate) - new Date(b.expDate));
        await meditem.save();

        const newStock = meditem.inStock[meditem.inStock.length - 1];

        const inout = new Inout({
            user: req.user._id, 
            meditem: meditem._id,
            stock: newStock._id,
            inout: req.body.stock,  
            addition: 'Received',
            updatedStock: meditem.totalStock
        });

        await inout.save();

    } catch (err) {
        console.log(err);
    }
    res.redirect(`/current/`);
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


// const update = async (req, res) => {
//     try {
//         const meditem = await Meditem.findById(req.params.id);
//         const stock = meditem.inStock.id(req.params.stockId);

//         if (!stock) {
//             return res.status(404).send('Stock not found');
//         }

//         if (req.body.addedStock) {
//             const addedStock = parseInt(req.body.addedStock, 10);
//             stock.stock += addedStock;
//         }

//         if (req.body.depletedStock) {
//             const depletedStock = parseInt(req.body.depletedStock, 10);
//             stock.stock -= depletedStock;
//         }

//         await meditem.save();

//         res.redirect(`/current/${meditem._id}`);
//     } catch (err) {
//         console.log(err);
//         res.render('meditems/show', {
//             title: 'Item Detail',
//             errorMsg: err.message
//         });
//     }
// }

// const add = async (req, res) => {
//     try {
//         const meditem = await Meditem.findById(req.params.id);
//         const stock = meditem.inStock.id(req.params.stockId);

//         if (!stock) { throw new Error('Stock not found'); }

//         res.render('stock/add', {
//             title: 'Add Stock',
//             meditem,
//             stock
//         });
//     } catch (err) {
//         console.log(err)
//         res.render('meditems/show', {
//             title: 'Item Detail',
//             errorMsg: err.message
//         });
//     }
// }

// const deplete = async (req, res) => {
//     try {
//         const meditem = await Meditem.findById(req.params.id);
//         const stock = meditem.inStock.id(req.params.stockId);

//         if (!stock) { throw new Error('Stock not found'); }

//         res.render('stock/deplete', {
//             title: 'Deplete Stock',
//             meditem,
//             stock
//         });
//     } catch (err) {
//         console.log(err)
//         res.render('meditems/show', {
//             title: 'Item Detail',
//             errorMsg: err.message
//         });
//     }
// }

module.exports = {
    create,
    delete: deleteStock,
    // update,
    // add,
    // deplete
}