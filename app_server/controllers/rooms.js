const fs = require('fs');
const path = require('path');
const rooms = JSON.parse(fs.readFileSync(path.join(__dirname, '../../data/rooms.json'), 'utf8'));

const packageJson = require('../../package.json');
/* GET rooms view */
const roomsView = (req, res) => {
    const pageTitle = packageJson.description + ' - Rooms';
    res.render('rooms', { title: pageTitle, rooms, isRooms: true });
};

module.exports = {
    rooms: roomsView
};



