import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/users/user.model';

export type FolderDocument = HydratedDocument<Folder>;

@Schema({ autoCreate: true })
export class Folder {
  @Prop()
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  owner: User;
}

export const FolderSchema = SchemaFactory.createForClass(Folder);
