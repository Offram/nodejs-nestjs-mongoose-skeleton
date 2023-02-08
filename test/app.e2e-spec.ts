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
          .post('/classrooms')
          .withBody(dto)
          .expectStatus(201)
          .stores('classroomId', '_id');
      });
    });

    describe('Get Classrooms', () => {
      it('should get classrooms', () => {
        return pactum
          .spec()
          .get('/classrooms')
          .expectStatus(200)
          .expectJsonLength(1)
          .expectBodyContains('$S{classroomId}');
      });
    });

    describe('Get Classroom by Id', () => {
      it('should get Classroom by Id', () => {
        return pactum
          .spec()
          .get('/classrooms/{id}')
          .withPathParams('id', '$S{classroomId}')
          .expectStatus(200)
          .expectBodyContains('$S{classroomId}');
      });
    });

    describe('Edit Classroom by Id', () => {
      const dto: ClassroomDto = {
        classroomName: 'First Test Classroom 2',
      };

      it('should get Classroom by Id', () => {
        return pactum
          .spec()
          .patch('/classrooms/{id}')
          .withPathParams('id', '$S{classroomId}')
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains('$S{classroomId}')
          .expectBodyContains(dto.classroomName);
      });
    });

    describe('Delete Classroom by Id', () => {
      it('should delete Classroom by Id', () => {
        return pactum
          .spec()
          .delete('/classrooms/{id}')
          .withPathParams('id', '$S{classroomId}')
          .expectStatus(204);
      });

      it('should get empty classrooms', () => {
        return pactum
          .spec()
          .get('/classrooms')
          .expectStatus(200)
          .expectBody([]);
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

      it('should return Student', () => {
        return pactum
          .spec()
          .post('/students')
          .withBody(dto)
          .expectStatus(201)
          .stores('studentId', '_id');
      });
    });

    describe('Get Students', () => {
      it('should get Students', () => {
        return pactum
          .spec()
          .get('/students')
          .expectStatus(200)
          .expectJsonLength(1)
          .expectBodyContains('$S{studentId}');
      });
    });

    describe('Get Student by Id', () => {
      it('should get Student by Id', () => {
        return pactum
          .spec()
          .get('/students/{id}')
          .withPathParams('id', '$S{studentId}')
          .expectStatus(200)
          .expectBodyContains('$S{studentId}');
      });
    });

    describe('Edit Student by Id', () => {
      const dto: StudentDto = {
        firstName: 'First Name 2',
        lastName: 'Last Name 2',
        contactPerson: 'Contact Person 2',
        contactNo: '+1111111112',
        email: 'test@test2.com',
        dob: new Date('1991-02-05T02:23:33.933Z'),
        age: 51,
        _classroomId: '$S{classroomId}',
      };

      it('should get Student by Id', () => {
        return pactum
          .spec()
          .patch('/students/{id}')
          .withPathParams('id', '$S{studentId}')
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains('$S{studentId}')
          .expectBodyContains(dto.firstName)
          .expectBodyContains(dto.lastName)
          .expectBodyContains(dto.contactPerson)
          .expectBodyContains(dto.contactNo)
          .expectBodyContains(dto.email)
          .expectBodyContains(dto.dob)
          .expectBodyContains(dto.age)
          .expectBodyContains(dto._classroomId);
      });
    });

    describe('Delete Student by Id', () => {
      it('should delete Student by Id', () => {
        return pactum
          .spec()
          .delete('/students/{id}')
          .withPathParams('id', '$S{studentId}')
          .expectStatus(204);
      });

      it('should get empty Students', () => {
        return pactum.spec().get('/students').expectStatus(200).expectBody([]);
      });
    });
  });
});
