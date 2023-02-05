import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { Classroom } from '../schemas/Classroom.schema';
import { Student } from '../schemas/Student.schema';

@Injectable()
export class DatabaseService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  getDbHandle(): Connection {
    return this.connection;
  }

  async cleanDb() {
    await this.connection.dropCollection(Student.name);
    await this.connection.dropCollection(Classroom.name);
  }
}
