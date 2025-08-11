import { ValidationError, HttpException } from '@nestjs/common';
export const exceptionFactory = (errors: ValidationError[]) => {
  const errorsException = errors.reduce<Record<string, string[]>>((acc, error) => {
    acc[error.property] = error.constraints ? Object.values(error.constraints) : ['Invalid value'];
    return acc;
  }, {});

  return new HttpException(errorsException, 422);
};
