import { Request, Response } from 'express';
import User from '../models/userModel';
import bcrypt from 'bcryptjs';
import { sendResetEmail } from '../services/emailService';
// Correct the path if necessary or ensure the file exists
import generateToken from '../utils/generateToken';

// Créer un nouvel utilisateur
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, entreprise } = req.body;

    if (!name || !email || !password || !entreprise) {
      return res.status(400).json({ message: 'Champs requis manquants' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Utilisateur déjà existant' });
    }

    const user = await User.create({ name, email, password, entreprise });

    const token = generateToken(user._id.toString());

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
  } catch (error) {
    console.error('❌ Erreur register :', error);
    return res.status(500).json({ message: 'Erreur serveur', error: (error as Error).message });
  }
};

// Connexion utilisateur
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    console.log('🔍 Requête reçue pour la connexion:', { email, password });

    if (!email || !password) {
      console.log('❌ Email ou mot de passe manquant');
      return res.status(400).json({ message: 'Email et mot de passe requis' });
    }

    const user = await User.findOne({ email });
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

    const token = generateToken(user._id.toString());
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
  } catch (error) {
    console.error('❌ Erreur login :', error);
    return res.status(500).json({ message: 'Erreur serveur', error: (error as Error).message });
  }
};
// Supprimer un compte
export const deleteAccount = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'userId requis' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }

    await User.findByIdAndDelete(userId);

    return res.status(200).json({ message: 'Compte supprimé avec succès.' });
  } catch (error) {
    console.error('❌ Erreur deleteAccount :', error);
    return res.status(500).json({ message: 'Erreur serveur', error: (error as Error).message });
  }
};

// Mot de passe oublié
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email requis' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }

    const resetToken = generateToken(user._id.toString());
    await sendResetEmail(user.email, resetToken);

    return res.status(200).json({ message: 'Email de réinitialisation envoyé.' });
  } catch (error) {
    console.error('❌ Erreur forgotPassword :', error);
    return res.status(500).json({ message: 'Erreur serveur', error: (error as Error).message });
  }
};

// Réinitialiser mot de passe
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { newPassword, userId } = req.body;

    console.log('🔍 Requête reçue pour réinitialiser le mot de passe:', { newPassword, userId });

    if (!newPassword || !userId) {
      console.log('❌ Champs requis manquants');
      return res.status(400).json({ message: 'Champs requis manquants' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    console.log('🔑 Mot de passe haché:', hashedPassword);

    const updatedUser = await User.findByIdAndUpdate(userId, { password: hashedPassword });
    if (!updatedUser) {
      console.log('❌ Utilisateur introuvable');
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }

    console.log('✅ Mot de passe réinitialisé avec succès pour l\'utilisateur:', userId);
    return res.status(200).json({ message: 'Mot de passe réinitialisé avec succès.' });
  } catch (error) {
    console.error('❌ Erreur resetPassword :', error);
    return res.status(500).json({ message: 'Erreur serveur', error: (error as Error).message });
  }
};