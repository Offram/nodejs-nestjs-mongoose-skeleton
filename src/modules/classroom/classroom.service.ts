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
    //Save the new Student in the db
    try {
      const classroom = new this.classroomModel(dto);
      await classroom.save();

      return classroom;
    } catch (error) {
      // if (error instanceof PrismaClientKnownRequestError) { //Not implemented
      //   if (error.code === 'P2002') {
      //     throw new ForbiddenException('Credentials taken');
      //   }
      // }
    }
  }

  async getAll() {
    //Get All Students from the db
    try {
      const classrooms = await this.classroomModel.find().exec();

      return classrooms;
    } catch (error) {
      // if (error instanceof PrismaClientKnownRequestError) { //Not implemented
      //   if (error.code === 'P2002') {
      //     throw new ForbiddenException('Credentials taken');
      //   }
      // }
    }
  }
}
