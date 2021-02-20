import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
   statusCode = 400;

   constructor(public errors: ValidationError[]) {
      super('Invalid request parameters');

      Object.setPrototypeOf(this, RequestValidationError.prototype);
   }
   serializeErrors() {
      return this.errors.map(err => {
         return { message: err.msg, field: err.param };
      });
   }
}

// interface CustomError {
//    statusCode: number;
//    serializeErrors(): {
//       message: String;
//       field?: string;
//    }[]
// }

// export class RequestValidationError extends Error implements CustomError {