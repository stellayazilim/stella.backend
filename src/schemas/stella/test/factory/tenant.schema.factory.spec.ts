import { TenantSchemaFactory } from '../../factory/tenant.schema.factory';
import { Tenant, TenantSchema } from '../../tenant.schema';

describe('Tenant factory', () => {
  it('should have name of Role', () => {
    expect(TenantSchemaFactory.name).toEqual(Tenant.name);
  });

  it('should useFactory method and must return TenantSchema', () => {
    expect(TenantSchemaFactory.useFactory).toBeDefined();
    expect(TenantSchemaFactory.useFactory()).toMatchObject(TenantSchema);
  });
});
