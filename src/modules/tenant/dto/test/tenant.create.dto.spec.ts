import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import { TenantCreateDto } from '../tenant.create.dto';
import { ValidationError, validate } from 'class-validator';

describe('tenant.create.dto', () => {
  it('should throw errors when passed empty object', async () => {
    const result = await validate(plainToInstance(TenantCreateDto, {}));

    result.forEach((e) => expect(e).toBeInstanceOf(ValidationError));
  });

  test('if isCompany is true do not validate firstName and lastName', async () => {
    const mockDto: TenantCreateDto = {
      name: 'stella',
      company: 'stella',
      isCompany: true,
      phone: '+905438559800',
      email: 'administrator@stellasoft.tech',
      hostname: 'stellasoft.tech',
      address: {
        country: 'Turkiye',
        city: 'Tekirdag',
        province: 'Corlu',
        addressLines: ['Ali pasa mah'],
        zipcode: '49580',
      },
    };

    const result = await validate(plainToInstance(TenantCreateDto, mockDto));

    expect(result.length).toBe(0);
  });

  test('if isComany set to true, validate company field and it must be set and string', async () => {
    const mockDto: TenantCreateDto = {
      name: 'stella',
      isCompany: true,
      phone: '+905438559800',
      email: 'administrator@stellasoft.tech',
      hostname: 'stellasoft.tech',
      address: {
        country: 'Turkiye',
        city: 'Tekirdag',
        province: 'Corlu',
        addressLines: ['Ali pasa mah'],
        zipcode: '49580',
      },
    };

    const result = await validate(plainToInstance(TenantCreateDto, mockDto));
    expect(result.length).toBe(1);
  });

  test('if isComany set to false, validate firstName and lastName fields it should be set and string', async () => {
    const mockDto: TenantCreateDto = {
      name: 'stella',
      isCompany: false,
      phone: '+905438559800',
      email: 'administrator@stellasoft.tech',
      hostname: 'stellasoft.tech',
      address: {
        country: 'Turkiye',
        city: 'Tekirdag',
        province: 'Corlu',
        addressLines: ['Ali pasa mah'],
        zipcode: '49580',
      },
    };

    const result = await validate(plainToInstance(TenantCreateDto, mockDto));
    expect(result.length).toBe(2);
  });
});
