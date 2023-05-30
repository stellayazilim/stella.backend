import { FlattenMaps } from 'mongoose';
import { Role } from 'src/schemas/stella/role.schema';

declare global {
  namespace Express {
    // tslint:disable-next-line:no-empty-interface
    interface User {
      _id: import('mongoose').Types.ObjectId;
      sub: string;
      role: FlattenMaps<Role> | null;
      email?: string;
    }

    interface Request {
      authInfo?: AuthInfo | undefined;
      user?: User | undefined | Partial<FlattenMaps<User>>;
    }
  }
}
