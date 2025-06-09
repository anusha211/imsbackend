// src/models/RolePermissionsMap.ts

import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { Role } from './Role';
  import { Permission } from './Permission';
  
  @Entity()
  export class RolePermissionsMap {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @ManyToOne(() => Role, (role) => role.permissions)
    @JoinColumn({ name: 'role_id' })
    role!: Role;
  
    @ManyToOne(() => Permission, (permission) => permission.rolePermissions)
    @JoinColumn({ name: 'permission_id' })
    permission!: Permission;
  }
  