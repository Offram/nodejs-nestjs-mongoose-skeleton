import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
// import * as request from 'supertest';
import * as pactum from 'pactum';
import { AppModule } from './../src/app.module';
import { AllExceptionsFilter } from 'src/mongoose/filters/AllExceptionError.filter';
import { MongoExceptionFilter } from 'src/mongoose/filters/MongoError.filter';
import { ValidationErrorFilter } from 'src/mongoose/filters/ValidationError.filter';
import { ClassroomDto } from 'src/modules/classroom/dto';
import { StudentDto } from 'src/modules/student/dto';
import { Model } from 'mongoose';
import { ClassroomDocument } from 'src/mongoose/schemas/Classroom.schema';
import { StudentDocument } from 'src/mongoose/schemas/Student.schema';

let app: INestApplication;

describe('App e2e', () => {
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    app.useGlobalFilters(new AllExceptionsFilter());
    app.useGlobalFilters(new MongoExceptionFilter());
    app.useGlobalFilters(new ValidationErrorFilter());

    await app.init();
    await app.listen(3333);

    const classroomModel: Model<ClassroomDocument> =
      moduleFixture.get('ClassroomModel');
    await classroomModel.deleteMany({});
    const studentModel: Model<StudentDocument> =
      moduleFixture.get('StudentModel');
    await studentModel.deleteMany({});
    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(() => {
    app.close();
  });

  describe('Classroom', () => {
    describe('Create Classroom', () => {
      const dto: ClassroomDto = {
        classroomName: 'First Test Classroom',
      };
      it('should return classroom', () => {
        return pactum
          .spec()
          .post('/classroom/create')
          .withBody(dto)
          .expectStatus(201)
          .stores('classroomId', '_id');
      });
    });

    describe('Get Classrooms', () => {
      it('should get classrooms', () => {
        return pactum
          .spec()
          .get('/classroom/getAll')
          .expectStatus(200)
          .expectJsonLength(1)
          .expectBodyContains('$S{classroomId}');
      });
    });
  });

  describe('Students', () => {
    describe('Create Student', () => {
      const dto: StudentDto = {
        firstName: 'First Name',
        lastName: 'Last Name',
        contactPerson: 'Contact Person',
        contactNo: '+111111111',
        email: 'test@test.com',
        dob: new Date('1990-02-05T02:23:33.933Z'),
        age: 50,
        _classroomId: '$S{classroomId}',
      };

      it('should return student', () => {
        const res = pactum
          .spec()
          .post('/student/create')
          .withBody(dto)
          .expectStatus(201)
          .stores('studentId', '_id');

        console.log('res: ', res);
        return res;
      });
    });

    describe('Get students', () => {
      it('should get students', () => {
        return pactum
          .spec()
          .get('/student/getAll')
          .expectStatus(200)
          .expectJsonLength(1)
          .expectBodyContains('$S{studentId}');
      });
    });
  });
});
