const express = require('express');
const router = express.Router();
const adminAuth = require('../middlewares/adminAuth');
const { adminRegisterController, userRegisterContoller } = require('../controllers');

router.post('/auth/signup', adminRegisterController);
router.post('/auth/register', auth, adminAuth, userRegisterContoller);
module.exports = router;