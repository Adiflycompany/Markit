import { Request, Response, NextFunction } from 'express';

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  // Exemple simple : à adapter
  const isAdminUser = true;
  if (!isAdminUser) {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};

export default isAdmin;
