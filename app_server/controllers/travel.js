const packageJson = require('../../package.json');
/* GET travel view */
const travel = (req, res) => {
    const pageTitle = packageJson.description + ' - Travel';
    res.render('travel' , { title: pageTitle });
};

module.exports = {
    travel
};