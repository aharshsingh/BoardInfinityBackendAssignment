const CustomErrorHandler = require('../../services/customerErrorHandler');
const bcrypt = require('bcrypt');
const { UserRegisterSchema } = require('../../services/validator');
const { User } = require('../../models'); 

const registerController = {
    async adminRegisterController(req, res, next) {
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

        const { userName, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            const user = await User.create({
                userName,
                email,
                password: hashedPassword,
            });
            res.send('Hello, you are now registered!');
        } catch (err) {
            return next(err);
        }
    },
};

module.exports = registerController;
