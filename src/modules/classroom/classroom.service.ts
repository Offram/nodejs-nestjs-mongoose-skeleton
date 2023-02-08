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

  async getOne(id: string) {
    //Get One Classroom from the db
    const classrooms = await this.classroomModel
      .findOne({
        _id: id,
      })
      .exec();

    return classrooms;
  }

  async editById(id: string, dto: ClassroomDto) {
    //Update the Classroom in the db
    const classroom = await this.classroomModel
      .findByIdAndUpdate(id, dto)
      .exec();

    return classroom.toJSON();
  }

  async deleteById(id: string) {
    //Delete the Classroom in the db
    await this.classroomModel.findByIdAndDelete(id).exec();
  }
}
