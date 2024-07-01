const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user_controller')

router.post('/createuser',user_controller.createuser)
router.post('/loginuser',user_controller.loginuser);
router.get('/getUsers',user_controller.getUsers)


module.exports = router;