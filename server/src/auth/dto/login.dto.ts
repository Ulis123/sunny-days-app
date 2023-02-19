import { IsEmail, IsNotEmpty, Matches, MinLength } from "class-validator";
import { Transform } from "class-transformer";

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => String(value).toLowerCase())
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @Matches(/[A-Za-z\d!@#$%^&*]+/)
  password: string;
}
