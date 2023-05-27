import { plainToInstance } from 'class-transformer';
import { RoleAddDto } from '../dto/role.add.dto';
import { ValidationError, validate } from 'class-validator';

describe('role.add.dto', () => {
  it('should throw errors when passed empty object', async () => {

    const result = await validate(plainToInstance(RoleAddDto, {}));
    // eslint-disable-next-line prettier/prettier
    expect(result).toBeInstanceOf(Array<ValidationError>);
    expect(result.length).toBeGreaterThan(1)
  });
});
