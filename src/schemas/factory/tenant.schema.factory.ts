import { Tenant, TenantSchema } from '../tenant.schema';
import type { AsyncModelFactory } from '@nestjs/mongoose';
export const TenantSchemaFactory: AsyncModelFactory = {
  name: Tenant.name,
  useFactory: () => TenantSchema,
};
