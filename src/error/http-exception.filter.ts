import { NotFoundException } from './exceptions/NotFoundException';
import { DuplicateException } from './exceptions/DuplicateException';
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomException } from './exceptions/CustomException';

@Catch(NotFoundException, DuplicateException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: CustomException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      message: exception.getMessage(),
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
