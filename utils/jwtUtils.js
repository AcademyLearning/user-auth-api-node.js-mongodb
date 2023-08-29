// utils/jwtUtils.js
const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/config');

exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: 'No token provided.' });
    }
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token.' });
        }
        req.userId = decoded.userId;
        next();
    });
};
