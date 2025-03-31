const express = require('express'); //Express app
const router = express.Router();    //Router logic

//This is where we import the controllers we will route
const tripsController = require('../controllers/trips');

//define route for our trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList) //GET Method routes tripList
    .post(tripsController.tripsAddTrip); // POST Method Adds a Trip

router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)  //GET Method routes tripList
    .put(tripsController.tripsUpdateTrip);

router
    .use('/Question', require('../../lafs-api/routes/question'));
    
module.exports = router;