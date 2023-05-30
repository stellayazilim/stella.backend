import { RoleSchemaFactory } from '../../factory/role.schema.factory';
import { RoleSchema } from '../../role.schema';
describe('Role factory', () => {
  it('should have name of Role', () => {
    expect(RoleSchemaFactory.name).toEqual('Role');
  });

  it('should useFactory method and must return RoleSchema', () => {
    expect(RoleSchemaFactory.useFactory).toBeDefined();
    expect(RoleSchemaFactory.useFactory()).toMatchObject(RoleSchema);
  });
});
