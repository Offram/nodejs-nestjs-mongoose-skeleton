import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './modules/student/student.module';
import { ClassroomModule } from './modules/classroom/classroom.module';
import { DatabaseModule } from './mongoose/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    DatabaseModule,
    StudentModule,
    ClassroomModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
