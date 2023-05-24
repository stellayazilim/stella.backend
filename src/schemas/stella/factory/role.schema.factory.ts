import { Role, RoleSchema } from '../role.schema';
import type { AsyncModelFactory } from '@nestjs/mongoose';
export const RoleSchemaFactory: AsyncModelFactory = {
  name: Role.name,
  useFactory: () => RoleSchema,
};
