import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

//Student Validation
export class StudentDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  contactPerson: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  contactNo: string;

  @ApiProperty({ type: String })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: Date })
  @IsString()
  @IsNotEmpty()
  dob: Date;

  @ApiPropertyOptional({ type: Number })
  @IsNumber()
  age: number;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  _classroomId: string;
}
