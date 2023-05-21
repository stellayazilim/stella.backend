import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
export type ProductDocument = HydratedDocument<Tenant>;

@Schema({ timestamps: { createdAt: true, updatedAt: true } })
export class Tenant {
  @Prop({ unique: true })
  name: string;

  @Prop()
  isCompany: boolean;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  phone: string[];
  @Prop({ unique: true })
  company: string;

  @Prop({ unique: true })
  hostname: string;

  @Prop()
  token: string;

  @Prop()
  passord: string;
}

export const TenantSchema = SchemaFactory.createForClass(Tenant);

export type TenantModel = Model<Tenant>;
