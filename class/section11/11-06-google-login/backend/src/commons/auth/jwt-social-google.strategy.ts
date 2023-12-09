import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  // 인증
  constructor() {
    super({
      // clientID 와 clientSecret 은 google cloud platform 에서 발급받을 수 있음. 구글에서 발급 받아 와야함.
      clientID: '구글ID',
      clientSecret: '구글시크릿',
      callbackURL: 'http://localhost:3000/login/google',
      scope: ['email', 'profile'], // scope => validate의 profile에 어떤걸 받고 싶은지
    });
  }

  // 인증 결과
  validate(accessToken, refreshToken, profile) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);

    // req.user 에 아래 return 하는 객체가 들어감. 이후 Controller(Resolver) 에서 꺼내서 쓸 수 있음.
    return {
      name: profile.displayName,
      email: profile.emails[0].value,
      hashedPassword: '1234',
      age: 0,
    };
  }
}
