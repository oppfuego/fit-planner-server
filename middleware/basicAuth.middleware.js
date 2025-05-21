const jwt = require('jsonwebtoken');
const { User } = require('../models/models');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

const basicAuth = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send({ message: 'No auth token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        console.log('Decoded token:', decoded);

        const user = await User.findOne({ where: { email: decoded.email } });
        if (!user) {
            console.log('User not found for email:', decoded.email);
            return res.status(401).send({ message: 'User not found' });
        }
        req.user = user;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.redirect('/');
        } else {
            return res.redirect('/login');
        }
    }
};

module.exports = basicAuth;