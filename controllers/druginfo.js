require('dotenv').config()
const axios = require('axios')
const API_KEY = process.env.API_KEY
const DOMAIN = 'https://api.fda.gov/drug/label.json?'


const show = async (req, res) => {
    try {
        const query = req.params.drugName;
        const response = await axios.get(`${DOMAIN}api_key=${API_KEY}&search=openfda.generic_name:"${query}"`);
        const data = response.data;

        const formattedProperties = Object.keys(data.results[0]).reduce((acc, prop) => {
            if (data.results[0][prop]) {
                acc[prop] = formatData(data.results[0][prop]);
            }
            return acc;
        }, {});

        res.render('druginfo/show', {
            title: `Drug Info: ${query}`,
            query,
            drugInfo: formattedProperties,
            meta: data.meta
        });
    } catch (err) {
        console.log(err);
        res.render('druginfo/show', {
            title: 'Drug Info: Item Not Found',
            errorMsg: 'Sorry, there is no match for that item in the database.'
        });
    }
};


function formatData(property) {
    if (!property || !Array.isArray(property) || property.length === 0) {
        return '';
    }

    return property.map(string => {
        let segments = string.split(/(?<=\s)(?=[A-Z][a-z])/).map(seg => seg.trim()).filter(seg => seg.length > 0);

        let htmlString = '';
        segments.forEach(segment => {
            let items = segment.split('•').map(item => item.trim()).filter(item => item.length > 0);

            if (items.length > 0) {
                let listHeader = items.shift();
                htmlString += `<p>${listHeader}</p>`;

                htmlString += '<ul>';
                items.forEach(li => {
                    htmlString += `<li>${li}</li>`;
                });
                htmlString += '</ul>';
            }
        });

        return htmlString;
    }).join('');
}




module.exports = {
    show
}