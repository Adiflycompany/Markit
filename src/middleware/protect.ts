import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel'; // Chemin correct selon ton projet

interface DecodedToken {
id: string;
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]; // Récupère le token

      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;

// Récupère l'utilisateur depuis la base de données sans le mot de passe
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
      return res.status(401).json({ message: 'Utilisateur non trouvé' });
    }

// Attache l'utilisateur au `req`
    (req as any).user = user;

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Non autorisé, token invalide' });
  }
  } else {
    return res.status(401).json({ message: 'Non autorisé, pas de token' });
  }
};

