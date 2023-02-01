import { IsNotEmpty, IsString } from 'class-validator';

//Classroom Validation
export class ClassroomDto {
  @IsString()
  @IsNotEmpty()
  classroomName: string;
}
