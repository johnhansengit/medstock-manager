const show = async (req, res) => {
    try {
        res.render('druginfo/show', {
            title: 'Drug Info',
        })
    } catch (err) {
        console.log(err)
        res.render('druginfo/show', {
            title: 'Drug Info',
            errorMsg: err.message
        });
    }
}


module.exports = {
    show
}