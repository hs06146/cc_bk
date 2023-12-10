import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthController {
  constructor(
    private readonly usersService: UsersService, //
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('google'))
  @Get('/login/google')
  async loginGoogle(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    let user = await this.usersService.findOne({
      email: req.user.email,
    });

    if (!user)
      user = await this.usersService.create({
        user: {
          ...req.user,
        },
      });

    this.authService.setRefreshTokenREST({ user, res });
    res.redirect(
      'http://localhost:5500/main-project/frontend/login/index.html',
    );
  }

  @UseGuards(AuthGuard('kakao'))
  @Get('/login/kakao')
  async loginKakao(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    let user = await this.usersService.findOne({
      email: req.user.email,
    });

    if (!user)
      user = await this.usersService.create({
        user: {
          ...req.user,
        },
      });

    this.authService.setRefreshTokenREST({ user, res });
    res.redirect(
      'http://localhost:5500/main-project/frontend/login/index.html',
    );
  }

  @UseGuards(AuthGuard('naver'))
  @Get('/login/naver')
  async loginOAuth(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    let user = await this.usersService.findOne({
      email: req.user.email,
    });

    if (!user)
      user = await this.usersService.create({
        user: {
          ...req.user,
        },
      });

    this.authService.setRefreshTokenREST({ user, res });
    res.redirect(
      'http://localhost:5500/main-project/frontend/login/index.html',
    );
  }
}

interface IOAuthUser {
  user: {
    password: string;
    email: string;
    name: string;
    age: number;
  };
}
