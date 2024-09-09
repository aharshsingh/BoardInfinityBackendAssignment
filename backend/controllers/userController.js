const User = require('../models/User');
const CustomErrorHandler = require('../services/customerErrorHandler')
const userController = {
    async getAllUser(req,res,next){
        try {
            const users = await User.findAll(); 
            res.json(users);
        } catch (err) {
            return next(err);
        }

    },
    async getUserById(req, res, next) {
        try {
            const user = await User.findByPk(req.params.id); 
            if (!user) {
                return next(CustomErrorHandler.notFound('User not found!'));
            }
            res.json(user);
        } catch (err) {
            return next(err);
        }
    },
    async updateUser(req,res,next){
        try {
            const userId = req.params.id;
            const user = await User.findByPk(userId);
            if (!user) {
                return next(CustomErrorHandler.notFound('User not found!'));
            }
            const updatedUser = await user.update(req.body); 
            res.json(updatedUser);
        } catch (err) {
            return next(err);
        }
    },
    async deleteUser(req, res, next) {
        try {
            const userId = req.params.id;
            const user = await User.findByPk(userId);
            if (!user) {
                return next(CustomErrorHandler.notFound('User not found!'));
            }
            await user.update({ isDeleted: true, deletedAt: new Date() });
            res.json({ message: 'User has been deleted' });
        } catch (err) {
            return next(err);
        }
    },
    async restoreUser(req, res, next) {
        try {
            const userId = req.params.id;
            const user = await User.findOne({
                where: {
                    id: userId,
                    isDeleted: true
                }
            });
            if (!user) {
                return next(CustomErrorHandler.notFound('User not found!'));
            }
            await user.update({ isDeleted: false, deletedAt: null });
            res.json({ message: 'User has been restored', user });
        } catch (err) {
            return next(err);
        }
    }
}

module.exports = userController;