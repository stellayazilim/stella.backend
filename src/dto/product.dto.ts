
import { Types } from "mongoose"
import { IsArray, IsBoolean, IsNumber, IsNumberString, IsObject, IsOptional, IsString , ValidateNested} from "class-validator"
import { Transform, Type } from "class-transformer"
import { RecordType  } from "src/misc/record.type";


export namespace ProductDto {

    export class ProductDataDto {

        @IsString()
        name: string;

        @IsString()
        category: Types.ObjectId;

        @IsOptional()
        @IsString({ each: true })
        images?:string[];

        @IsObject()
        @ValidateNested()
        @Type(()=> RecordType )
        specs: Record<string, any>;
    }



    export class ProductsSelectDto {
        
        @IsObject()
        @ValidateNested()
        @Type(()=> RecordType)
        select: RecordType;
        

        @IsOptional()
        @IsNumber()
        @Type(()=> Number)
        limit?: number;

        @IsOptional()
        @IsNumber()
        @Type(()=> Number)
        skip?: number;


        @IsOptional()
        @IsString({ each: true})
        populate?: string[];
    }


    export class ProductImageDto {
       
        @IsObject({each: true})
        @ValidateNested({each: true})
        @Type(()=> Array<{_id: string}>)
        images: { _id: string }[]
    }

    export class ProductImageDeleteDto {
        @IsString()
        _id: string
    }

}