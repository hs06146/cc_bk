import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
// import {KakaoStrategy} from 'passport-kakao'
// import {NaverStrategy} from 'passport-naver';
// import {GoogleStrategy} from 'passport-google'; 처럼 전략패턴을 사용하여 strategy를 교체한다.
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: ({ req }) => {
        const cookie = req.headers.cookie;
        const refreshToken = cookie.replace('refreshToken=', '');
        return refreshToken;
      },
      ignoreExpiration: false,
      secretOrKey: '나의리프레시비밀번호', // 비밀번호
    });
  }

  async validate(payload: any) {
    return { id: payload.sub }; // => req.user = { id: payload.sub }
  }
}
