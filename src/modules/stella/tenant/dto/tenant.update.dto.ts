import {
  IsString,
  IsBoolean,
  ValidateIf,
  IsMobilePhone,
  IsEmail,
  IsOptional,
} from 'class-validator';
import { TenantCreateDto } from './tenant.create.dto';

export class TenantUpdateDto extends TenantCreateDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  hostname: string;

  @IsOptional()
  @IsBoolean()
  isCompany: boolean;

  @IsOptional()
  @ValidateIf((d) => d.isCompany)
  @IsString()
  company: string;

  @IsOptional()
  @ValidateIf((d) => !d.isCompany)
  @IsString()
  firstName: string;

  @IsOptional()
  @ValidateIf((d) => !d.isCompany)
  @IsString()
  lastName: string;

  @IsOptional()
  @IsMobilePhone()
  @ValidateIf((d) => !d.phoneNumber || d.mobileNumber)
  phone: string;

  @IsOptional()
  @IsEmail()
  email: string;
}
