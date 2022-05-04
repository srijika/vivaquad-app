// Importing express module
const express = require("express")
const rootRouter = express.Router()

//****START ROUTES****
// USER
const user_auth = require('./user/auth');


// ****ADMIN****
const admin_auth = require('./admin/auth');
const dashboard = require('./admin/admin')
const user_managment = require('./admin/user')
const setting = require('./admin/setting')
const page = require('./admin/page')

//****END ROUTES****


 


//****Combine Routes****
// USER
rootRouter.use('/', user_auth);

// ADMIN
rootRouter.use('/', admin_auth);
rootRouter.use('/', dashboard);
rootRouter.use('/', user_managment);
rootRouter.use('/', setting);
rootRouter.use('/', page);

//Export Routes
module.exports = rootRouter;