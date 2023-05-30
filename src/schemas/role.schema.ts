import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';

@Schema({ timestamps: { createdAt: true, updatedAt: true } })
export class Role {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  perms: number[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
export type RoleModel = Model<Role>;
export type RoleDocument = HydratedDocument<Role>;
