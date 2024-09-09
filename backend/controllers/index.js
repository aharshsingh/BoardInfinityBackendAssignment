const adminRegisterController = require('./auth/adminRegisterController');
const userRegisterContoller = require('./auth/userRegisterContoller');
const loginContoller = require('./auth/loginController');
const userController = require('./userController');
const projectController = require('./projectController');
const roleController = require('./roleController')
module.exports = { adminRegisterController, loginContoller, userRegisterContoller, roleController, userController, projectController };