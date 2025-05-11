"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.deleteAccount = exports.login = exports.register = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const emailService_1 = require("../services/emailService");
// Correct the path if necessary or ensure the file exists
const generateToken_1 = __importDefault(require("../utils/generateToken"));
// Créer un nouvel utilisateur
const register = async (req, res) => {
    try {
        const { name, email, password, entreprise } = req.body;
        if (!name || !email || !password || !entreprise) {
            return res.status(400).json({ message: 'Champs requis manquants' });
        }
        const userExists = await userModel_1.default.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Utilisateur déjà existant' });
        }
        const user = await userModel_1.default.create({ name, email, password, entreprise });
        const token = (0, generateToken_1.default)(user._id.toString());
        return res.status(201).json({
            message: 'Utilisateur créé avec succès.',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                entreprise: user.entreprise,
            },
            token,
        });
    }
    catch (error) {
        console.error('❌ Erreur register :', error);
        return res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};
exports.register = register;
// Connexion utilisateur
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('🔍 Requête reçue pour la connexion:', { email, password });
        if (!email || !password) {
            console.log('❌ Email ou mot de passe manquant');
            return res.status(400).json({ message: 'Email et mot de passe requis' });
        }
        const user = await userModel_1.default.findOne({ email });
        if (!user) {
            console.log('❌ Utilisateur introuvable pour l\'email:', email);
            return res.status(404).json({ message: 'Utilisateur introuvable' });
        }
        console.log('✅ Utilisateur trouvé:', user);
        const isMatch = await user.matchPassword(password);
        console.log('🔑 Résultat de la comparaison des mots de passe:', isMatch);
        if (!isMatch) {
            console.log('❌ Mot de passe incorrect pour l\'utilisateur:', email);
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }
        const token = (0, generateToken_1.default)(user._id.toString());
        console.log('✅ Connexion réussie, token généré:', token);
        return res.status(200).json({
            message: 'Connexion réussie.',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                entreprise: user.entreprise,
            },
            token,
        });
    }
    catch (error) {
        console.error('❌ Erreur login :', error);
        return res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};
exports.login = login;
// Supprimer un compte
const deleteAccount = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({ message: 'userId requis' });
        }
        const user = await userModel_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur introuvable' });
        }
        await userModel_1.default.findByIdAndDelete(userId);
        return res.status(200).json({ message: 'Compte supprimé avec succès.' });
    }
    catch (error) {
        console.error('❌ Erreur deleteAccount :', error);
        return res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};
exports.deleteAccount = deleteAccount;
// Mot de passe oublié
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: 'Email requis' });
        }
        const user = await userModel_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur introuvable' });
        }
        const resetToken = (0, generateToken_1.default)(user._id.toString());
        await (0, emailService_1.sendResetEmail)(user.email, resetToken);
        return res.status(200).json({ message: 'Email de réinitialisation envoyé.' });
    }
    catch (error) {
        console.error('❌ Erreur forgotPassword :', error);
        return res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};
exports.forgotPassword = forgotPassword;
// Réinitialiser mot de passe
const resetPassword = async (req, res) => {
    try {
        const { newPassword, userId } = req.body;
        console.log('🔍 Requête reçue pour réinitialiser le mot de passe:', { newPassword, userId });
        if (!newPassword || !userId) {
            console.log('❌ Champs requis manquants');
            return res.status(400).json({ message: 'Champs requis manquants' });
        }
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, 10);
        console.log('🔑 Mot de passe haché:', hashedPassword);
        const updatedUser = await userModel_1.default.findByIdAndUpdate(userId, { password: hashedPassword });
        if (!updatedUser) {
            console.log('❌ Utilisateur introuvable');
            return res.status(404).json({ message: 'Utilisateur introuvable' });
        }
        console.log('✅ Mot de passe réinitialisé avec succès pour l\'utilisateur:', userId);
        return res.status(200).json({ message: 'Mot de passe réinitialisé avec succès.' });
    }
    catch (error) {
        console.error('❌ Erreur resetPassword :', error);
        return res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};
exports.resetPassword = resetPassword;
