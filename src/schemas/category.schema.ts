import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Product } from './product.schema';
import { HydratedDocument, Types, Model } from 'mongoose';

@Schema({ timestamps: { createdAt: true, updatedAt: true } })
export class Category {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }] })
  products: Product[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);

export type CategoryDocument = HydratedDocument<Category>;

export type CategoryModel = Model<Category>;
