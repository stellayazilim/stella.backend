import "reflect-metadata"
import { plainToInstance } from 'class-transformer';
import { TenantUpdateDto } from "../dto/tenant.update.dto";
import { ValidationError, validate } from 'class-validator';

describe('tenant.update.dto', () => {
  it('should have all properties optional and must not throw error when passing empty object', async () => {

    const result = await validate(plainToInstance(TenantUpdateDto, {}));
    // eslint-disable-next-line prettier/prettier
    expect(result).toBeInstanceOf(Array<ValidationError>);
    expect(result.length).toBe(0)
  });
});
