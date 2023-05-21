import { IsBoolean, IsString, ValidateIf } from 'class-validator';

export class TenantBaseDto {
  @IsString()
  name: string;

  @IsString()
  host: string;

  @IsBoolean()
  isCompany: boolean;

  @ValidateIf((d) => d.isCompany)
  @IsString()
  company?: string;

  @ValidateIf((d) => !d.isCompany)
  @IsString()
  firstName: string;

  @ValidateIf((d) => !d.isCompany)
  @IsString()
  lastName: string;
}
