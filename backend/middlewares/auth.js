const CustomErrorHandler = require('../services/customerErrorHandler');
const JwtService = require('../services/JWTService');
const auth = async (req,res,next) => {
    let authHeader = req.headers.authorization;
    if(!authHeader){
        return  next(CustomErrorHandler.notAuthorized());
    }

    const token = authHeader.split(' ')[1];
    try {
        const { id, role } =  await JwtService.verify();
        const user = {
            id,
            role
        }
        req.user = user;
        next();
    } catch (error) {
        return next(CustomErrorHandler.notAuthorized());
    }
}

module.exports = auth;