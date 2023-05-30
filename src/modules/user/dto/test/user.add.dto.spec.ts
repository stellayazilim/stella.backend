import { plainToInstance } from 'class-transformer';
import { UserAddDto } from '../user.add.dto';
import { ValidationError, validate } from 'class-validator';

describe('UserAddDto', () => {
  it('should throw error for each empty field', async () => {

    const result = await validate(plainToInstance(UserAddDto, {}));
    // eslint-disable-next-line prettier/prettier
    expect(result).toBeInstanceOf(Array<ValidationError>);
    expect(result.length).toBeGreaterThan(1)
  });
});
