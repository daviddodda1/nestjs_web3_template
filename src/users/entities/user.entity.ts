import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsBoolean, IsEmail, IsString } from 'class-validator';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ type: String, required: true })
  @IsString()
  _id: string;

  @Prop({ type: String, required: true, unique: true })
  @IsString()
  public_address: string;
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set('toJSON', {
  virtuals: true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.createdAt;
    delete ret.updatedAt;
  },
});

export { UserSchema };
