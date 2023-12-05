import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
// import {KakaoStrategy} from 'passport-kakao'
// import {NaverStrategy} from 'passport-naver';
// import {GoogleStrategy} from 'passport-google'; 처럼 전략패턴을 사용하여 strategy를 교체한다.
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor() {
    super({
      // jwtFromRequest: (req) => {
      //     const temp = req.headers.Authorization;
      //     const accessToken = temp.toLowerCase().replace("bearer ", "");
      //     return accessToken;
      // }
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // accessToken
      ignoreExpiration: false,
      secretOrKey: '나의비밀번호', // 비밀번호
    });
  }

  async validate(payload: any) {
    return { id: payload.sub }; // => req.user = { id: payload.sub }
  }
}
