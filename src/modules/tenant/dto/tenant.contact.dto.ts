import { Type } from 'class-transformer';
import {
  IsEmail,
  IsMobilePhone,
  IsOptional,
  IsPhoneNumber,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { TenantBaseDto } from './tenant.base.dto';

export class TenantContactDto {
  @ValidateIf((d) => d.phoneNumber || !d.mobileNumber)
  @IsPhoneNumber('TR', { each: true })
  phoneNumber: string[];

  @IsMobilePhone('tr-TR', {}, { each: true })
  @ValidateIf((d) => !d.phoneNumber || d.mobileNumber)
  mobileNumber: string[];

  @IsEmail({}, { each: true })
  email?: string[];
}

export class TenantWithContactDto extends TenantBaseDto {
  @ValidateNested()
  @Type(() => TenantContactDto)
  contact: TenantContactDto;
}
