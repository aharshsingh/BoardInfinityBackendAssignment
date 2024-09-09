const bcrypt = require('bcrypt');
const CustomErrorHandler = require('../../services/customerErrorHandler');
const { UserRegisterSchema } = require('../../services/validator');
const User = require('../../models/User');

const registerController = {
    async userRegister(req, res, next) {
        const { error } = UserRegisterSchema.validate(req.body);
        if (error) {
            return next(error);
        }

        try {
            const exist = await User.findOne({ where: { email: req.body.email } });
            if (exist) {
                return next(CustomErrorHandler.alreadyExists('Email is already registered'));
            }
        } catch (err) {
            return next(err);
        }

        const { userName, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            const user = await User.create({
                userName,
                email,
                password: hashedPassword,
                role,
            });

            res.status(201).json({ message: 'User successfully registered!', user });
        } catch (err) {
            return next(err);
        }
    },
};

module.exports = registerController;
