const tripsEndpoint = 'http://localhost:3000/api/trips';
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
};

//var fs = require('fs');
//var trips = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/trips.json'), 'utf8'));

// GET travel view
const travel = async function (req, res, next) {
    await fetch(tripsEndpoint, options)
        .then(res => res.json())
        .then(json => {
            let message = null;
            if (!(json instanceof Array)) {
                message = 'API lookup error';
                json = [];
            } else {
                if (!json.length) {
                    message = 'No trips exist in our database!';
                }
            }
            res.render('travel', { title: 'Travlr Getaways', trips: json, message });
        })
        .catch(err => res.status(500).send(err.message));
};

// GET travel details view
const travelDetails = async function (req, res, next) {
    const tripCode = req.params.tripCode;
    const detailsEndpoint = `${tripsEndpoint}/${tripCode}`;

    await fetch(detailsEndpoint, options)
        .then(res => res.json())
        .then(json => {
            let message = null;
            if (!json) {
                message = 'Trip not found';
                json = {};
            }
            res.render('travel-detail', { title: `Travlr Getaways - ${tripCode}`, trip: json, message });
        })
        .catch(err => res.status(500).send(err.message));
};

module.exports = {
    travel,
    travelDetails
};


