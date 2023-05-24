import { IsNumber, IsOptional, IsString } from 'class-validator';

export class RoleUpdateDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsNumber({}, { each: true })
  perms?: number[];
}
