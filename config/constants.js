const families = [
    {name: 'Analgesics/Antipyretics', class: 'c1'},
    {name: 'Antibiotics (Oral)', class: 'c2'},
    {name: 'Antiemetics', class: 'c3'},
    {name: 'Anti-Diarrheals', class: 'c4'},
    {name: 'Antihistimines', class: 'c5'},
    {name: 'Antihypertensives', class: 'c6'},
    {name: 'Corticosteroids (Oral)', class: 'c7'},
    {name: 'Diarrhetics', class: 'c8'},
    {name: 'Emergency Drugs', class: 'c9'},
    {name: 'IV Fluids', class: 'c10'},
    {name: 'Laxitives/Stool Softeners', class: 'c11'},
    {name: 'Topicals & Drops', class: 'c12'},
    {name: 'Vaccines',  class: 'c13'}
];

const depletions = [
    'Patient Care',
    'Expired',
    'Waste',
    'Transfer Out',
    'Count Correction',
    'Other - See Note'
]

module.exports = {
    families,
    depletions
}