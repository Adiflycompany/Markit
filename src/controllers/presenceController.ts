import { Request, Response } from 'express';
import Presence from '../models/presenceModel';

// Créer une présence
export const createPresence = async (req: Request, res: Response) => {
  try {
    const { userId, event, date } = req.body;
    const presence = await Presence.create({ userId, event, date });
    res.status(201).json(presence);
  } catch (error) {
    res.status(500).json({ message: 'Erreur création présence', error });
  }
};

// Lister toutes les présences
export const getAllPresences = async (req: Request, res: Response) => {
  try {
    const presences = await Presence.find().populate('userId', 'name email');
    if (!presences || presences.length === 0) {
      return res.status(404).json({ message: 'Aucune présence trouvée' });
    }
    res.status(200).json(presences);
  } catch (error) {
    res.status(500).json({ message: 'Erreur récupération des présences', error });
  }
};

// Lister les présences d’un utilisateur
export const getUserPresences = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const presences = await Presence.find({ userId });
    res.status(200).json(presences);
  } catch (error) {
    res.status(500).json({ message: 'Erreur récupération utilisateur', error });
  }
};

// Supprimer une présence
export const deletePresence = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Presence.findByIdAndDelete(id);
    res.status(200).json({ message: 'Présence supprimée' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur suppression présence', error });
  }
};

// Exporter les présences
export const exportPresencesToCSV = async (req: Request, res: Response) => {
  try {
    const presences = await Presence.find().populate('userId', 'name email');
    if (!presences || presences.length === 0) {
      return res.status(404).json({ message: 'Aucune présence à exporter' });
    }
    res.status(200).json(presences); // Remplace par génération CSV si tu veux un vrai fichier
  } catch (error) {
    res.status(500).json({ message: 'Erreur export CSV', error });
  }
};
