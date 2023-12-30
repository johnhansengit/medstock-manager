require('dotenv').config()
const axios = require('axios')
const API_KEY = process.env.API_KEY
const DOMAIN = 'https://api.fda.gov/drug/label.json?'


const show = async (req, res) => {
    try {
        const query = req.params.drugName
        const response = await axios.get(`${DOMAIN}api_key=${API_KEY}&search=${query}`)
        const data = response.data

        const formattedProperties = {
            active_ingredient: formatData(data.results[0].active_ingredient),
            purpose: formatData(data.results[0].purpose),
            indications_and_usage: formatData(data.results[0].indications_and_usage),
            dosage_and_administration: formatData(data.results[0].dosage_and_administration),
            boxed_warning: formatData(data.results[0].boxed_warning),
            warnings: formatData(data.results[0].warnings),
            precautions: formatData(data.results[0].precautions),
            do_not_use: formatData(data.results[0].do_not_use),
            stop_use: formatData(data.results[0].stop_use),
            adverse_reactions: formatData(data.results[0].adverse_reactions),
            pediatric_use: formatData(data.results[0].pediatric_use),
            geriatric_use: formatData(data.results[0].geriatric_use),
            pregnancy: formatData(data.results[0].pregnancy),
            pregnancy_or_breast_feeding: formatData(data.results[0].pregnancy_or_breast_feeding),
            nursing_mothers: formatData(data.results[0].nursing_mothers),
            labor_and_delivery: formatData(data.results[0].labor_and_delivery),
            information_for_patients: formatData(data.results[0].information_for_patients),
            when_using: formatData(data.results[0].when_using),
            ask_doctor: formatData(data.results[0].ask_doctor),
            ask_doctor_or_pharmacist: formatData(data.results[0].ask_doctor_or_pharmacist),
            storage_and_handling: formatData(data.results[0].storage_and_handling)
        };

        res.render('druginfo/show', {
            title: `Drug Info: ${query}`,
            query,
            drugInfo: formattedProperties,
            meta: data.meta
        })
    } catch (err) {
        console.log(err)
        res.render('druginfo/show', {
            title: 'Drug Info',
            errorMsg: err.message
        });
    }
}

function formatData(property) {
    if (!property || !Array.isArray(property) || property.length === 0) {
        return '';
    }

    return property.map(string => {
        // Split the string at each capital letter
        let segments = string.split(/(?<=\s)(?=[A-Z][a-z])/).map(seg => seg.trim()).filter(seg => seg.length > 0);

        let htmlString = '';
        segments.forEach(segment => {
            // Split each segment further by bullet points
            let items = segment.split('•').map(item => item.trim()).filter(item => item.length > 0);

            if (items.length > 0) {
                // The first item of each segment is the list header
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