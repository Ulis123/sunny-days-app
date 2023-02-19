import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { instanceToPlain } from "class-transformer";

import { SignupDto } from "src/auth/dto/signup.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly users: Repository<User>) {}

  async create(signupDto: SignupDto) {
    await this.users.save(this.users.create(instanceToPlain(signupDto)));
    return { message: "User successfully created. Now you can Sign In" };
  }

  async findOne(param: FindOptionsWhere<User>) {
    return this.users.findOne({ where: param });
  }

  async update(userId: number, updateData: Partial<User>) {
    return this.users.update({ id: userId }, updateData);
  }

  async findUserWithPass(param: FindOptionsWhere<User>) {
    return this.users.findOne({
      where: param,
      select: {
        id: true,
        email: true,
        password: true,
      },
    });
  }
}
