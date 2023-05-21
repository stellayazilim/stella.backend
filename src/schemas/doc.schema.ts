import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types, HydratedDocument, Model } from 'mongoose';
import { Product } from "./product.schema";


@Schema({ timestamps: { createdAt: true, updatedAt: true }})
export class Doc {

    @Prop()
    url: string;

    @Prop()
    description: string;

    @Prop({ref: "Product", type: Types.ObjectId })
    product: Product;
}

export type DocDocument = HydratedDocument<Doc>

export const DocSchema = SchemaFactory.createForClass(Doc)
export type DocModel = Model<Doc>