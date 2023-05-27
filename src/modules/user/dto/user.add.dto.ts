import { IsEmail, IsMobilePhone, IsString } from 'class-validator';

export class UserAddDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsMobilePhone()
  phone: string;

  @IsString()
  role: string;
}
