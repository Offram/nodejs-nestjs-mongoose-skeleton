import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student, StudentDocument } from 'src/mongoose/schemas/Student.schema';
import { StudentDto } from './dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name)
    private readonly studentModel: Model<StudentDocument>,
  ) {}

  async create(dto: StudentDto) {
    //Save the new Student in the db
    try {
      const student = new this.studentModel(dto);
      await student.save();

      return student;
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
      const students = await this.studentModel.find().exec();

      return students;
    } catch (error) {
      // if (error instanceof PrismaClientKnownRequestError) { //Not implemented
      //   if (error.code === 'P2002') {
      //     throw new ForbiddenException('Credentials taken');
      //   }
      // }
    }
  }
}
