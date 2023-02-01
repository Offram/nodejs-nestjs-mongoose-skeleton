import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

//Student Validation
export class StudentDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  contactPerson: string;

  @IsString()
  @IsNotEmpty()
  contactNo: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  dob: Date;

  @IsString()
  @IsNotEmpty()
  age: number;

  @IsString()
  @IsNotEmpty()
  classroomId: string;
}
