const fs = require('fs');
const path = require('path');
const trips = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/trips.json'), 'utf8'));

const packageJson = require('../../package.json');
/* GET travel view */
const travel = (req, res) => {
    const pageTitle = packageJson.description + ' - Travel';
    res.render('travel', { title: pageTitle, trips, isTravel: true });
};

module.exports = {
    travel
};

