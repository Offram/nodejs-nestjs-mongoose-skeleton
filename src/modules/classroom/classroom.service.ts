import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Classroom,
  ClassroomDocument,
} from 'src/mongoose/schemas/Classroom.schema';
import { ClassroomDto } from './dto';

@Injectable()
export class ClassroomService {
  constructor(
    @InjectModel(Classroom.name)
    private readonly classroomModel: Model<ClassroomDocument>,
  ) {}

  async create(dto: ClassroomDto) {
    //Save the new Classroom in the db
    const classroom = new this.classroomModel(dto);
    await classroom.save();

    return classroom.toJSON();
  }

  async getAll() {
    //Get All Classrooms from the db
    const classrooms = await this.classroomModel.find().exec();

    return classrooms;
  }
}
