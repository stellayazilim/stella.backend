import { Schema , Prop, SchemaFactory, raw} from "@nestjs/mongoose";
import { HydratedDocument , Model, Types} from "mongoose";
import { Category } from "./category.schema";

export type ProductDocument = HydratedDocument<Product>

class Spec {  [key: string]: string }

@Schema({ timestamps: { createdAt: true, updatedAt: true }})
export class Product {
   

    @Prop()
    name: string;

    @Prop({type: Category})
    category: Category;

    @Prop({
        auto: true,
        type: [{
            ref: "Image", 
            type: Types.ObjectId
        }],
        unique: true,
        index: true
    })
    images: Types.ObjectId[]

    @Prop(raw(Spec))
    specs: Record<string, any>
}   


export const ProductSchema = SchemaFactory.createForClass(Product)


export type ProductModel = Model<Product>