"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel")); // Chemin correct selon ton projet
const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]; // Récupère le token
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            // Récupère l'utilisateur depuis la base de données sans le mot de passe
            const user = await userModel_1.default.findById(decoded.id).select('-password');
            if (!user) {
                return res.status(401).json({ message: 'Utilisateur non trouvé' });
            }
            // Attache l'utilisateur au `req`
            req.user = user;
            next();
        }
        catch (error) {
            console.error(error);
            return res.status(401).json({ message: 'Non autorisé, token invalide' });
        }
    }
    else {
        return res.status(401).json({ message: 'Non autorisé, pas de token' });
    }
};
exports.protect = protect;
