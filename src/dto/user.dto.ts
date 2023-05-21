import { IsString, IsEmail, IsNumber, Min, Max } from 'class-validator';



export namespace UserDto {

    export class UserDataDto {

        @IsString()
        @IsEmail()
        email: string;


        @IsString()
        password: string;


        @IsNumber()
        @Min(0)
        @Max(1)
        role: 0 | 1;
    }


    export class UserLoginDto {
        @IsString()
        @IsEmail()
        email: string;


        @IsString()
        password: string;

    }
}