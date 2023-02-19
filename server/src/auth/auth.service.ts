import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { instanceToPlain } from "class-transformer";

import { UsersService } from "src/users/users.service";
import { LoginDto } from "./dto/login.dto";
import { SignupDto } from "./dto/signup.dto";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateJwtUser(id) {
    return this.usersService.findOne({ id });
  }

  async validateUserByEmailAndPass(email: string, password: string) {
    const user = await this.usersService.findUserWithPass({ email });

    if (!user) {
      throw new BadRequestException("Wrong email");
    }

    const isPassCorrect = await user.checkPassword(password);
    if (!isPassCorrect) {
      throw new UnauthorizedException("Wrong password");
    }

    const { password: _, ...restFields } = user;
    return restFields;
  }

  async logIn(loginDto: LoginDto) {
    const { email, password } = instanceToPlain(loginDto);
    const user = await this.validateUserByEmailAndPass(email, password);

    return { ...user, token: this.jwtService.sign(user) };
  }

  async signUp(signupDto: SignupDto) {
    return this.usersService.create(signupDto);
  }
}
