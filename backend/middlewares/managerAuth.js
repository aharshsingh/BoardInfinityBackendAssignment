const CustomErrorHandler = require('../services/customerErrorHandler');

const managerAuth = (req,res,next) => {
    if(req.user.role !== 'admin' || req.user.role !== 'manager') {
        return next(CustomErrorHandler.notAuthorized('Access denied. Admin and managers only!'));
    }
    next();
};

export default managerAuth;