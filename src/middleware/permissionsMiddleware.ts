// src/middleware/permissionsMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../data-source';
import { RolePermissionsMap } from '../models/RolePermissionsMap';
import { JwtPayload } from '../types/custome';


interface customRequest extends Request{
  user?:JwtPayload;
}

export const checkPermissions = (requiredPermissions: string[]) => {
  return async (req: customRequest, res: Response, next: NextFunction) => {
    try {
      const rolePermissionsRepository = AppDataSource.getRepository(RolePermissionsMap);
      const user = req.user as JwtPayload;
       console.log('User:', user);
       console.log(user.role);
      // Get permissions for user's role
      const rolePermissions = await rolePermissionsRepository.find({
        where: { role: { name: user.role } },
        relations: ['permission'],
      });
      console.log(user.role);

      

      const userPermissions = rolePermissions.map((rp) => rp.permission.name);

      // Check if user has the required permissions
      const hasPermission = requiredPermissions.every((permission) =>
        userPermissions.includes(permission)
      );

      if (!hasPermission) {
        return res.status(403).json({ message: 'Insufficient permissions' });
      }

      next();
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  };
};


