const { User } = require('../../models');
const CustomErrorHandler = require('../services/customerErrorHandler');
const roleController = {
    async assignRole(req, res, next) {
        try {
            const userId = req.params.id;
            const { role } = req.body;
            const validRoles = ['Admin', 'Manager', 'User'];
            if (!validRoles.includes(role)) {
                return next(CustomErrorHandler.invalid('Invalid role provided!'));
            }
            const user = await User.findByPk(userId);
            if (!user) {
                return next(CustomErrorHandler.notFound('User not found!'));
            }
            user.role = role;
            await user.save();
            res.json({ message: 'Role assigned successfully', user });
        } catch (err) {
            return next(err);
        }
    },
    async revokeRole(req, res, next) {
        try {
            const userId = req.params.id;
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            user.role = null; 
            await user.save();
            res.json({ message: 'Role revoked successfully', user });
        } catch (err) {
            return next(err);
        }
    }
};

module.exports = roleController;
