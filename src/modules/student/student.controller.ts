import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { StudentDto } from './dto';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('create')
  create(@Body() dto: StudentDto) {
    return this.studentService.create(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('getAll')
  getAll() {
    return this.studentService.getAll();
  }
}