import { registerDecorator, ValidationOptions } from "class-validator";
import { IsEqualToValidator } from "../validators/is-equal-to.validator";

export const IsEqualTo = (property: string, validationOptions?: ValidationOptions) => {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsEqualToValidator,
    });
  };
};
