// src/models/Permission.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RolePermissionsMap } from './RolePermissionsMap';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @OneToMany(() => RolePermissionsMap, (map) => map.permission)
  rolePermissions!: RolePermissionsMap[];
}
