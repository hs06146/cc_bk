import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService, //
    private readonly jwtService: JwtService,
  ) {}

  async login({ userId, password }: IAuthServiceLogin): Promise<string> {
    const user = await this.usersService.findOneByUserId({ userId });
    if (!user)
      throw new UnprocessableEntityException('존재하지 않는 아이디입니다.');

    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) throw new UnprocessableEntityException('암호가 틀립니다.');

    return this.getAccessToken({ user });
  }

  getAccessToken({ user }: IAuthServiceGetAccessToken): string {
    const payload = { sub: user.id };
    return this.jwtService.sign(payload, {
      secret: 'myPassword',
      expiresIn: '1h',
    });
  }
}

interface IAuthServiceGetAccessToken {
  user: User;
}

interface IAuthServiceLogin {
  userId: string;
  password: string;
}
