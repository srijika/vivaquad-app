// Importing express module
const express = require("express")
const router = express.Router()
const userController = require('../../controllers/userController')
const authenticateJWT = require('../../middlewares/authenticate')
const cors = require('cors')
const upload = require("../../middlewares/image_upload");
router.use(cors());


//ADMIN API
router.post('/api/admin/updateprofile', authenticateJWT, upload.any(), userController.adminupdateprofile);

//EMPLOYEE API
router.post('/api/admin/epmloyee/create', upload.any(), userController.createEmployee)
router.post('/api/admin/epmloyee/update', upload.any(), userController.updateEmployee)




//USER API
router.post('/api/getprofile', authenticateJWT, userController.getprofile)
router.post('/api/user/editprofile', authenticateJWT, upload.any(), userController.editprofile)
router.post('/api/user/updateprofile', upload.any(), userController.updateUserProfile)
router.post('/api/get-user-detail', authenticateJWT, userController.getUserDetail)
router.post('/api/deleteuser', userController.deleteuser)
router.post('/api/getalluserlist', userController.getalluser);





//User Active and Deactive
router.post('/api/user-active', userController.userActive)
router.post('/api/user/status', userController.userActiveDeactiveStatus)









 


module.exports = router;