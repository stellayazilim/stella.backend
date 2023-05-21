import { IsString, IsOptional } from "class-validator";



export namespace ImageDto {

    export class ImageDataDto {

        @IsString()
        src: string


        @IsOptional()
        @IsString()
        alt?: string;


        @IsOptional()
        @IsString()
        description?: string;
    }
}