import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ index: true, unique: true })
  email: string;

  @Prop({ select: false })
  password: string;

  @Prop({ type: Number, enum: [0, 1], default: 1 })
  role: number;

  @Prop({ type: [String] })
  sessions: string[];

  @Prop({ type: Boolean, default: false })
  isValidated: boolean;
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);

export type UserModel = Model<User>;
