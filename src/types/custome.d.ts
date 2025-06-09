// src/types/custom.d.ts

import { Request } from 'express';

// Define the expected structure of your JWT payload
export interface JwtPayload {
  id: number;
  role: string;
  iat: number; // Issued at
  exp: number; // Expiration time
}

// Extend the Express Request interface to include the user property
export interface CustomRequest extends Request {
  user?: JwtPayload;
}
