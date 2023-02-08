import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { StudentDto } from './dto';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('')
  async create(@Body() dto: StudentDto) {
    return await this.studentService.create(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('')
  getAll() {
    return this.studentService.getAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getOne(@Param('id') studentId: string) {
    return this.studentService.getOne(studentId);
  }

  @Patch(':id')
  editById(@Param('id') studentId: string, @Body() dto: StudentDto) {
    return this.studentService.editById(studentId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteById(@Param('id') studentId: string) {
    return this.studentService.deleteById(studentId);
  }
}
