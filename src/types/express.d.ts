import { FlattenMaps } from 'mongoose';
import { Role } from 'src/schemas/stella/role.schema';

declare module 'express' {
  export interface Request {
    user?: {
      _id: import('mongoose').Types.ObjectId;
      email: string;
      role: FlattenMaps<Role> | null;
    };
  }
}
