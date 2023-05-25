import { User, UserSchema } from '../user.schema';
import type { AsyncModelFactory } from '@nestjs/mongoose';
export const UserSchemaFactory: AsyncModelFactory = {
  name: User.name,
  useFactory: () => UserSchema,
};
