import { Request, Response, NextFunction } from 'express';

const protect = (req: Request, res: Response, next: NextFunction) => {
  // Exemple simple : à adapter
  const authorized = true;
  if (!authorized) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};

export default protect;

