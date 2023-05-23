import { IsOptional, IsString } from 'class-validator';

export class TenantAddressDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsString()
  country: string;

  @IsString()
  city: string;

  @IsString({ each: true })
  province: string[];

  @IsString()
  zipcode: string;
}
