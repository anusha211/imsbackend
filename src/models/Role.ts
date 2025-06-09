// src/models/Role.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RolePermissionsMap } from './RolePermissionsMap';
import { User } from './User';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @OneToMany(() => RolePermissionsMap, (map) => map.role)
  permissions!: RolePermissionsMap[];

  @OneToMany(() => User, (user) => user.role)
  users!: User[];
}
