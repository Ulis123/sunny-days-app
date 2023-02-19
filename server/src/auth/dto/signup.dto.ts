import { IsEmail, IsNotEmpty } from "class-validator";
import { Transform } from "class-transformer";

import { IsEqualTo } from "../decorators/is-equal-to.decorator";
import { IsEmailExists } from "../decorators/is-email-exists.decorator";
import { LoginDto } from "./login.dto";

export class SignupDto extends LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @IsEmailExists()
  @Transform(({ value }) => String(value).toLowerCase())
  email: string;

  @IsNotEmpty()
  @IsEqualTo("password")
  confirmPassword: string;
}
