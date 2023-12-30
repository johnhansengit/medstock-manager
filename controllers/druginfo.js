require('dotenv').config()
const axios = require('axios')
const API_KEY = process.env.API_KEY
const DOMAIN = 'https://api.fda.gov/drug/label.json?'


const show = async (req, res) => {
    try {
        const query = req.params.drugName
        const response = await axios.get(`${DOMAIN}api_key=${API_KEY}&search=${query}`)
        const data = response.data

        res.render('druginfo/show', {
            title: `Drug Info: ${query}`,
            query,
            drugInfo: data.results[0],
            disclaimer: data.meta.disclaimer
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