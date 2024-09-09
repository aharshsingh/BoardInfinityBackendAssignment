const customErrorHandler = require('../../services/customerErrorHandler');
const bcrypt = require('bcrypt');
const JwtService = require('../../service/JWTService');
const { User } = require('../../models');
const { loginSchema } = require('../../services/validator');

const loginController = {
    async login(req, res, next) {
        const { error } = loginSchema.validate(req.body);
        if (error) {
            return next(error);
        }
        try {
            const user = await User.findOne({ where: { email: req.body.email } });
            if (!user) {
                return next(customErrorHandler.wrongCredentials('Username or password is wrong'));
            }
            const match = await bcrypt.compare(req.body.password, user.password);
            if (!match) {
                return next(customErrorHandler.wrongCredentials('Username or password is wrong'));
            }
            const token = JwtService.sign({ id: user.id, role: user.role });
            res.json({ token }); 
        } catch (err) {
            return next(err);
        }
    }
};

module.exports = loginController;
