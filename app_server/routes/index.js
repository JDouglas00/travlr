const express = require('express'); //Express app
const router = express.Router();    //Router logic

//This is where we import the controllers we will route
const travelController = require('../controllers/travel');

//define route for our trips endpoint
router.get('/travel', travelController.travel); //GET Method routes tripList

router.get('/travel/:tripCode', travelController.travelDetails);  //GET Method routes tripList
 
    
module.exports = router;