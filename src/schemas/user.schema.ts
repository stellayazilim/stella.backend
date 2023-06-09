import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { Role, RoleSchema } from './role.schema';

@Schema({ timestamps: { createdAt: true, updatedAt: true } })
export class User {
  @Prop()
  email: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  phone: string;

  @Prop({ type: RoleSchema, ref: 'Role' })
  role: Role;

  @Prop({ select: false })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserModel = Model<User>;
export type UserDocument = HydratedDocument<User>;
