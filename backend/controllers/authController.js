const User = require('../models/User');
const { generateToken } = require('../utils/jwt');

// @desc    Register new user
// @route   POST /api/auth/register
const register = async (req, res) => {
    // To be implemented
    res.status(501).json({ message: 'Not implemented yet' });
};

// @desc    Login user
// @route   POST /api/auth/login
const login = async (req, res) => {
    // To be implemented
    res.status(501).json({ message: 'Not implemented yet' });
};

module.exports = { register, login };
