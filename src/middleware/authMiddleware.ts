// src/middleware/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomRequest, JwtPayload } from '../types/custome'; // Import your custom types

// Make sure JwtPayload is exported
export { JwtPayload };

export const authenticateJWT = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY||'your_jwt_secret', (err: any, decoded: any) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden console logging' });
    }

    req.user = decoded as JwtPayload;
    next();
  });
};
