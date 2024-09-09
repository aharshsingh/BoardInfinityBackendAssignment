const express = require('express');
const router = express.Router();
const adminAuth = require('../middlewares/adminAuth');
const { adminRegisterController, userRegisterContoller } = require('../controllers');

router.post('/auth/signup', adminRegisterController);
router.post('/auth/register', auth, adminAuth, userRegisterContoller);
router.post('/auth/login', auth, adminAuth, loginContoller.login);
router.get('/users', auth, managerAuth, userController.getAllUser);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', auth, adminAuth, userController.updateUser);
router.delete('/users/:id', auth, adminAuth, userController.deleteUser);
router.patch('/users/restore/:id', auth, adminAuth, userController.restoreUser);
router.post('/users/:id/assign-role', auth, admin, roleController.assignRole);
router.post('/users/:id/revoke-role', auth, admin, roleController.revokeRole);
module.exports = router;