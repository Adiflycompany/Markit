"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protect = (req, res, next) => {
    // Exemple simple : à adapter
    const authorized = true;
    if (!authorized) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
};
exports.default = protect;
