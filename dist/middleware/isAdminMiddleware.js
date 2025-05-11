"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isAdmin = (req, res, next) => {
    // Exemple simple : à adapter
    const isAdminUser = true;
    if (!isAdminUser) {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};
exports.default = isAdmin;
