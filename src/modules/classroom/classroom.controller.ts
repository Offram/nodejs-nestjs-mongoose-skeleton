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
import { ClassroomService } from './classroom.service';
import { ClassroomDto } from './dto';

@Controller('classroom')
export class ClassroomController {
  constructor(private readonly classroomService: ClassroomService) {}

  @Post('')
  create(@Body() dto: ClassroomDto) {
    return this.classroomService.create(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('')
  getAll() {
    return this.classroomService.getAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getOne(@Param('id') classroomId: string) {
    return this.classroomService.getOne(classroomId);
  }

  @Patch(':id')
  editById(@Param('id') classroomId: string, @Body() dto: ClassroomDto) {
    return this.classroomService.editById(classroomId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteById(@Param('id') classroomId: string) {
    return this.classroomService.deleteById(classroomId);
  }
}
