import { UserSchemaFactory } from '../../factory/user.schema.factory';
import { User, UserSchema } from '../../user.schema';

describe('User factory', () => {
  it('should have name of User', () => {
    expect(UserSchemaFactory.name).toEqual(User.name);
  });

  it('should useFactory method and must return TenantSchema', () => {
    expect(UserSchemaFactory.useFactory).toBeDefined();
    expect(UserSchemaFactory.useFactory()).toMatchObject(UserSchema);
  });
});
