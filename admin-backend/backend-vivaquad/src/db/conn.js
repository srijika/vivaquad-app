const mongoose = require('mongoose');

const localDB = "mongodb://127.0.0.1:27017/vivaquad";
const liveDB = "mongodb://plenum:raryFouPl1@161.97.157.111:27017/vivaquad?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";



mongoose.connect(process.env.MONGODB_URI || liveDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(() => {
    console.log(`DB connection successfull`);
}).catch((error) => {
    console.log(error);
});


mongoose.Promise = global.Promise;
module.exports = {
    UserLogins: require('../models/users'),
    Setting: require('../models/settings'),
    Page: require('../models/pages'), 
    School: require('../models/schools'), 



};