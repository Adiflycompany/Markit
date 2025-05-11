"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportPresencesToCSV = exports.deletePresence = exports.getUserPresences = exports.getAllPresences = exports.createPresence = void 0;
const presenceModel_1 = __importDefault(require("../models/presenceModel"));
// Créer une présence
const createPresence = async (req, res) => {
    try {
        const { userId, event, date } = req.body;
        const presence = await presenceModel_1.default.create({ userId, event, date });
        res.status(201).json(presence);
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur création présence', error });
    }
};
exports.createPresence = createPresence;
// Lister toutes les présences
const getAllPresences = async (req, res) => {
    try {
        const presences = await presenceModel_1.default.find().populate('userId', 'name email');
        if (!presences || presences.length === 0) {
            return res.status(404).json({ message: 'Aucune présence trouvée' });
        }
        res.status(200).json(presences);
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur récupération des présences', error });
    }
};
exports.getAllPresences = getAllPresences;
// Lister les présences d’un utilisateur
const getUserPresences = async (req, res) => {
    try {
        const { userId } = req.params;
        const presences = await presenceModel_1.default.find({ userId });
        res.status(200).json(presences);
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur récupération utilisateur', error });
    }
};
exports.getUserPresences = getUserPresences;
// Supprimer une présence
const deletePresence = async (req, res) => {
    try {
        const { id } = req.params;
        await presenceModel_1.default.findByIdAndDelete(id);
        res.status(200).json({ message: 'Présence supprimée' });
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur suppression présence', error });
    }
};
exports.deletePresence = deletePresence;
// Exporter les présences
const exportPresencesToCSV = async (req, res) => {
    try {
        const presences = await presenceModel_1.default.find().populate('userId', 'name email');
        if (!presences || presences.length === 0) {
            return res.status(404).json({ message: 'Aucune présence à exporter' });
        }
        res.status(200).json(presences); // Remplace par génération CSV si tu veux un vrai fichier
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur export CSV', error });
    }
};
exports.exportPresencesToCSV = exportPresencesToCSV;
