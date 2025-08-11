import { ValidationError, HttpException } from '@nestjs/common';
export declare const exceptionFactory: (errors: ValidationError[]) => HttpException;
