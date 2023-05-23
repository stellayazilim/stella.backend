import { IsOptional, IsString } from 'class-validator';

export class RoleAddDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString({ each: true })
  perms: import('mongoose').Types.ObjectId[];
}
