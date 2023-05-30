import { plainToInstance } from 'class-transformer';
import { UserUpdateDto } from '../user.create.dto';
import { ValidationError, validate } from 'class-validator';

describe('user.update.dto', () => {
  it('should have all fields optional and must not throw error on empty object', async () => {

    const result = await validate(plainToInstance(UserUpdateDto, {}));
    // eslint-disable-next-line prettier/prettier
    expect(result).toBeInstanceOf(Array<ValidationError>);
    expect(result.length).toBe(0)
  });
});
