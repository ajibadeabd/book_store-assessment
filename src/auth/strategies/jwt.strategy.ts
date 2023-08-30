import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IUser } from '../../user/type';
import { UserEntity } from '../../user/entity/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // constructor() {
  constructor(
    private userEntity: UserEntity, // private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY || 'JWT_SECRET_KEY',
    });
  }

  async validate(payload: IUser) {
    const user = await this.userEntity.getUser({ email: payload.email });
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
