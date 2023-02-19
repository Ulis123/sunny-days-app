import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { TypeORMError } from "typeorm";

class CustomTypeORMError extends TypeORMError {
  detail: string;
  code: string;
}

@Catch(TypeORMError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
  catch(exception: CustomTypeORMError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const message = exception.detail;

    response.status(HttpStatus.BAD_REQUEST).json({ message });
  }
}
