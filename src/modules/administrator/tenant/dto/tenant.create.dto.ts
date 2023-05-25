import { Type } from 'class-transformer';
import {
  IsString,
  IsBoolean,
  ValidateIf,
  IsMobilePhone,
  IsEmail,
  ValidateNested,
  IsPhoneNumber,
} from 'class-validator';
import { TenantAddressDto } from './tenant.address.dto';

export class TenantCreateDto {
  @IsString()
  name: string;

  @IsString()
  hostname: string;

  @IsBoolean()
  isCompany: boolean;

  @ValidateIf((d) => d.isCompany)
  @IsString()
  company?: string;

  @ValidateIf((d) => !d.isCompany)
  @IsString()
  firstName?: string;

  @ValidateIf((d) => !d.isCompany)
  @IsString()
  lastName?: string;

  @IsMobilePhone('tr-TR')
  phone: string;

  @IsEmail()
  email: string;

  @Type(() => TenantAddressDto)
  @ValidateNested()
  address: TenantAddressDto;
}
