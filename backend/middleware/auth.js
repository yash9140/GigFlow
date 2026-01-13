const User = require('../models/User');
const { verifyToken } = require('../utils/jwt');

const protect = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: 'Not authenticated' });
        }

        const decoded = verifyToken(token);
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Not authorized' });
    }
};

module.exports = { protect };
