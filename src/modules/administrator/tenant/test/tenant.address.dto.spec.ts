import { plainToInstance } from 'class-transformer';
import { TenantAddressDto } from '../dto/tenant.address.dto';
import { ValidationError, validate } from 'class-validator';

describe('tenant adress.dto', () => {
  it('should throw errors when passed empty object', async () => {

    const result = await validate(plainToInstance(TenantAddressDto, {}));
    // eslint-disable-next-line prettier/prettier
    expect(result).toBeInstanceOf(Array<ValidationError>);
    expect(result.length).toBeGreaterThan(1)
  });


  it("should not to generate error for name field", async () => {
    const generated = 
        await validate(plainToInstance(TenantAddressDto, {}))
    const expected = 
        await validate(plainToInstance(TenantAddressDto, { name: "Home"}))
    expect(generated.length).toEqual(expected.length)
  })
});
