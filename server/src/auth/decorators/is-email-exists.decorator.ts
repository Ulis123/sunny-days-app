import { registerDecorator, ValidationOptions } from "class-validator";

import { IsEmailExistsValidator } from "../validators/is-email-exists.validator";

export const IsEmailExists = (validationOptions?: ValidationOptions) => {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailExistsValidator,
    });
  };
};
