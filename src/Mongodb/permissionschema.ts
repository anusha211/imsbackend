// permission.model.ts
import { Schema, model } from 'mongoose';

const PermissionSchema = new Schema({
  name: { type: String, required: true, unique: true },
});

export const Permission = model('Permission', PermissionSchema);
