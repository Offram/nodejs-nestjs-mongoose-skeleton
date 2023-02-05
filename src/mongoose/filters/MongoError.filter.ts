import {
  ArgumentsHost,
  Catch,
  // ConflictException,
  ExceptionFilter,
} from '@nestjs/common';
import { MongoServerError } from 'mongodb';

@Catch(MongoServerError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoServerError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    switch (exception.code) {
      case 11000:
        // duplicate exception
        // do whatever you want here, for instance send error to client
        return response.status(400).json({
          statusCode: 400,
          createdBy: 'MongoExceptionFilter',
          message: 'Following keys already exist',
          errors: exception.keyValue,
        });
      default:
        return response.status(400).json({
          statusCode: 400,
          createdBy: 'MongoExceptionFilter',
          errors: exception,
        });
    }
  }
}
