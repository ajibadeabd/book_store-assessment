/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from 'src/auth/types';
import { IUser } from './type';
import { UserEntity } from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PointService } from 'src/point/point.service';

@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userEntity: UserEntity,
    private readonly pointService: PointService,
  ) {}

  async loginUser(loginUserDto: LoginUserDto) {
    try {
      // const user = await this.userEntity.findUserByEmail(loginUserDto.email);
      const user = await this.userEntity.getUser({ email: loginUserDto.email });

      if (!user) {
        throw new HttpException('User not found', 404);
      }

      const passwordMatch = await bcrypt.compare(
        loginUserDto.password,
        user.password,
      );

      if (!passwordMatch) {
        throw new HttpException('Invalid credentials', 401);
      }
      const payload = { id: user.id, email: user.email };

      const token = this.jwtService.sign(payload);
      delete user.password;

      return { user, token };
    } catch (error) {
      throw error;
    }
  }
  async createUser(createUserDto: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      const userData = {
        ...createUserDto,
        password: hashedPassword,
      };

      const newUser = await this.userEntity.createUser(userData);
      await this.pointService.createPoint(100, newUser.id);

      return { name: newUser.name, email: newUser.email };
    } catch (error) {
      throw new HttpException(
        error.code === 'P2002'
          ? 'Account with this email already exist'
          : 'Error occur while creating user',
        400,
      );
    }
  }
}
