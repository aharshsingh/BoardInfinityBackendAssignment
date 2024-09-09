const CustomErrorHandler = require('../services/customerErrorHandler');

const adminAuth = (req,res,next) => {
    if(req.user.role !== 'admin') {
        return next(CustomErrorHandler.notAuthorized('Access denied. Admin only!'));
    }
    next();
};

module.exports = adminAuth;