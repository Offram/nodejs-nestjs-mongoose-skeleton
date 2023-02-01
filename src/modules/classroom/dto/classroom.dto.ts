import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

//Classroom Validation
export class ClassroomDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  classroomName: string;
}
