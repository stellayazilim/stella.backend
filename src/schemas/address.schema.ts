import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';

@Schema({ timestamps: { createdAt: true, updatedAt: true } })
export class Address {
  @Prop()
  name: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  city: string;
  @Prop({ required: true })
  province: string;

  @Prop({ type: [String] })
  adressLines: string[];

  @Prop()
  zip: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);

export type AddressModel = Model<Address>;
export type AddressDocument = HydratedDocument<Address>;
