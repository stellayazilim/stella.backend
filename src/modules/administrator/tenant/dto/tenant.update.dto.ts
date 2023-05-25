import { Type } from 'class-transformer';
import {
  IsString,
  IsBoolean,
  ValidateIf,
  IsMobilePhone,
  IsEmail,
  IsOptional,
  ValidateNested,
  IsPhoneNumber,
} from 'class-validator';
import { TenantAddressDto } from './tenant.address.dto';

export class TenantUpdateDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  hostname?: string;

  @IsOptional()
  @IsBoolean()
  isCompany?: boolean;

  @IsOptional()
  @ValidateIf((d) => d.isCompany)
  @IsString()
  company?: string;

  @IsOptional()
  @ValidateIf((d) => !d.isCompany)
  @IsString()
  firstName?: string;

  @IsOptional()
  @ValidateIf((d) => !d.isCompany)
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsMobilePhone('tr-TR')
  phone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => TenantAddressDto)
  address?: TenantAddressDto;
}
