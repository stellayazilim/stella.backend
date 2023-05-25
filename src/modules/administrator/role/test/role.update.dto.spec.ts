import { plainToInstance } from 'class-transformer';
import { RoleUpdateDto } from '../dto/role.update.dto';
import { ValidationError, validate } from 'class-validator';

describe('role.update.dto', () => {
  it('should have all fields optional and must not throw error on empty object', async () => {

    const result = await validate(plainToInstance(RoleUpdateDto, {}));
    // eslint-disable-next-line prettier/prettier
    expect(result).toBeInstanceOf(Array<ValidationError>);
    expect(result.length).toBe(0)
  });
});
