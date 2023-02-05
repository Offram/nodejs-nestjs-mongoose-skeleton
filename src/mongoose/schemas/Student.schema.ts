import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date, HydratedDocument } from 'mongoose';

@Schema()
export class Student {
  //First Name
  @Prop({
    type: String,
    required: true,
  })
  firstName: string;

  //Last Name
  @Prop({
    type: String,
    required: true,
  })
  lastName: string;

  //Contact Person
  @Prop({
    type: String,
    required: true,
  })
  contactPerson: string;

  //Contact No
  @Prop({
    type: String,
    required: true,
  })
  contactNo: string;

  //Email address
  @Prop({
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    max: 255,
    min: 6,
  })
  email: string;

  //Date of Birth
  @Prop({
    type: Date,
    required: true,
  })
  dob: Date;

  //Age
  @Prop({
    type: Number,
    required: true,
  })
  age: number;

  //Classroom
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classroom',
    required: true,
    unique: true,
  })
  _classroomId: string;
}

export type StudentDocument = HydratedDocument<Student>;
export const StudentSchema = SchemaFactory.createForClass(Student);
