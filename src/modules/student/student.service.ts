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
    const student = new this.studentModel(dto);
    await student.save();

    return student.toJSON();
  }

  async getAll() {
    //Get All Students from the db
    const students = await this.studentModel.find().exec();

    return students;
  }

  async getOne(id: string) {
    //Get One Student from the db
    const student = await this.studentModel
      .findOne({
        _id: id,
      })
      .exec();

    return student;
  }

  async editById(id: string, dto: StudentDto) {
    //Update the Student in the db
    const student = await this.studentModel.findByIdAndUpdate(id, dto).exec();

    return student.toJSON();
  }

  async deleteById(id: string) {
    //Delete the Student in the db
    await this.studentModel.findByIdAndDelete(id).exec();
  }
}
