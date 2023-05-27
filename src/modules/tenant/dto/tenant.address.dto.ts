import { IsOptional, IsString } from 'class-validator';

export class TenantAddressDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsString()
  country: string;

  @IsString()
  city: string;

  @IsString()
  province: string;

  @IsString({ each: true })
  addressLines: string[];
  @IsString()
  zipcode: string;
}
