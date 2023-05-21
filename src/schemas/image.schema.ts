import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Model } from "mongoose";




@Schema({ 
    timestamps: { 
        createdAt: true, 
        updatedAt: true 
    }
})
export class Image {

    @Prop()
    description: string;

    @Prop({ unique: true, index: true })
    src: string;

    @Prop()
    alt: string;
}


export type ImageDocument = HydratedDocument<Image>
export const ImageSchema = SchemaFactory.createForClass(Image)
export type ImageModel = Model<Image>

