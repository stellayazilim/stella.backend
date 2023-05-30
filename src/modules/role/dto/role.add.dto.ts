import { IsNumber, IsOptional, IsString } from 'class-validator';

export class RoleAddDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber({}, { each: true })
  perms: number[];
}
