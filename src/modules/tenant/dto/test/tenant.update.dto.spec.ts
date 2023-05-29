import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import { TenantUpdateDto } from '../tenant.update.dto';
import { ValidationError, validate } from 'class-validator';
import { TenantAddressDto } from '../tenant.address.dto';

describe('tenant.update.dto', () => {
  it('should have all properties optional and must not throw error when passing empty object', async () => {
    const result = await validate(plainToInstance(TenantUpdateDto, {}));

    result.forEach((e) => expect(e).toBeInstanceOf(ValidationError));
    expect(result.length).toBe(0);
  });

  it('should have address type of TenantAddressDto', async () => {
    const mockDto: TenantUpdateDto = {
      address: {
        country: 'Turkiye',
        city: 'Tekirdag',
        province: 'Corlu',
        zipcode: '59855',
        name: 'home',
        addressLines: ['Alipasa mah'],
      },
    };
    const result = await plainToInstance(TenantUpdateDto, mockDto);
    expect(result.address).toBeInstanceOf(TenantAddressDto);
  });
});
