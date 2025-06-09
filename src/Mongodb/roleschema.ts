import mongoose, { Schema, Document } from 'mongoose';
import { Permission } from './permissionschema' // Import the permission model

interface Role extends Document {
  name: string;
  permissions: mongoose.Types.ObjectId[]; // Array of ObjectIds referencing Permission
}

const RoleSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }], // Reference to permissions
});

export const Role = mongoose.model<Role>('Role', RoleSchema);
