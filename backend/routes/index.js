const express = require('express');
const router = express.Router();
const adminAuth = require('../middlewares/adminAuth');
const auth = require('../middlewares/auth')
const managerAuth = require('../middlewares/managerAuth');
const { adminRegisterController, loginContoller, userRegisterContoller, userController, roleController, projectController } = require('../controllers');

router.post('/auth/signup', adminRegisterController.adminRegister);
router.post('/auth/register', auth, adminAuth, userRegisterContoller.userRegister);
router.post('/auth/login', auth, adminAuth, loginContoller.login);
router.get('/users', auth, managerAuth, userController.getAllUser);
router.get('/users/:id', auth, userController.getUserById);
router.put('/users/:id', auth, adminAuth, userController.updateUser);
router.delete('/users/:id', auth, adminAuth, userController.deleteUser);
router.patch('/users/restore/:id', auth, adminAuth, userController.restoreUser);
router.post('/users/:id/assign-role', auth, adminAuth, roleController.assignRole);
router.post('/users/:id/revoke-role', auth, adminAuth, roleController.revokeRole);
router.post('/project', auth, adminAuth, projectController.createProject);
router.get('/project', auth, projectController.getAllProject);
router.get('/project/:id', auth, projectController.getProject);
router.put('/project/:id', auth, adminAuth, projectController.updateProject);
router.delete('/project/:id', auth, adminAuth, projectController.deleteProject);
router.patch('/project/:id', auth, adminAuth, projectController.restoreProject);
module.exports = router;
