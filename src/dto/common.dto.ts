
import { IsOptional, ValidateNested, IsObject, IsNumber, IsString, IsBoolean} from "class-validator"
import { Type } from "class-transformer"
import { RecordType  } from "src/misc/record.type";
export namespace CommonDto {

    export class QuerySingleDto {
        
            
            @IsOptional()
            @IsString({ each: true})
            select?: string[];
    
    
            @IsOptional()
            @IsObject()
            @ValidateNested()
            @Type(()=> Array<string>)
            populate?: string[];
      
    }


    export class QueryMultipleDto {
          
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
        @IsObject()
        @ValidateNested()
        @Type(()=> RecordType)
        populate?: RecordType;
    }


    export class QueryUpdateDto{
        @IsOptional()
        @IsBoolean()
        new?: boolean


        @IsOptional()
        @IsString({each: true})
        populate?: string[]


        @IsOptional()
        @IsString({ each: true})
        select?: string[];
    }
}