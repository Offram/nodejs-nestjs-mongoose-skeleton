import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ClassroomService } from './classroom.service';
import { ClassroomDto } from './dto';

@Controller('classroom')
export class ClassroomController {
  constructor(private readonly classroomService: ClassroomService) {}

  @Post('create')
  create(@Body() dto: ClassroomDto) {
    return this.classroomService.create(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('getAll')
  getAll() {
    return this.classroomService.getAll();
  }
}
