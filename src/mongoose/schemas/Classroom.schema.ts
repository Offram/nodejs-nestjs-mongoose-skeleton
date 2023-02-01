import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Classroom {
  //Classroom Name
  @Prop({
    type: String,
    required: true,
  })
  classroomName: string;
}

export type ClassroomDocument = HydratedDocument<Classroom>;
export const ClassroomSchema = SchemaFactory.createForClass(Classroom);
