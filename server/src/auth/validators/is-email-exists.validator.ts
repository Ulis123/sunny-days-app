import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

import { UsersService } from "src/users/users.service";

@ValidatorConstraint({ async: true })
export class IsEmailExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly usersService: UsersService) {}

  async validate(value: string) {
    const user = await this.usersService.findOne({ email: value.toLowerCase() });
    return !user;
  }

  defaultMessage(args: ValidationArguments) {
    return `A user with ${args.value} email address already exists`;
  }
}
