import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    /**
     * @description Exception json response
     * @param type Error Type @param message Error Message
     */
    const responseMessage = (type, message) => {
      response.status(status).json({
        statusCode: status,
        path: request.url,
        errorType: type,
        errorMessage: message,
      });
    };

    // Throw an exceptions for either
    // MongoError, ValidationError, TypeError, CastError and Error

    // console.log(
    //   'exception instanceof HttpException: ',
    //   exception instanceof MongooseError,
    // );
    // console.log('exception: ', exception);

    if (!!(exception?.getResponse() as any)?.message) {
      responseMessage(
        exception.name,
        (exception?.getResponse() as any)?.message,
      );
    } else {
      responseMessage(exception.name, exception.message);
    }
  }
}
