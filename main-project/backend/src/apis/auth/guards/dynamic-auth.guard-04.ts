import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// prev
// const result = {
//   // [curr] = key 안에 들어있는 값을 key로 하겠다.
//   [curr]: new (class extends AuthGuard(curr) {})()
// }

// Object literal lookup
const DYNAMIC_AUTH_GUARD = ['google', 'kakao', 'naver'].reduce((prev, curr) => {
  return { ...prev, [curr]: new (class extends AuthGuard(curr) {})() };
}, {});

// 1단계
// {

// }

// 2단계
// {
//   google: new (class extends AuthGuard('google') {})()
// }

// 3단계
// {
//   google: new (class extends AuthGuard('google') {})()
//   kakao: new (class extends AuthGuard('kakao') {})(),
// }

// 4단계
// {
//   google: new (class extends AuthGuard('google') {})()
//   kakao: new (class extends AuthGuard('kakao') {})(),
//   naver: new (class extends AuthGuard('naver') {})(),
// }

export class DynamicAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const { social } = context.switchToHttp().getRequest().params;
    return DYNAMIC_AUTH_GUARD[social].canActivate(context);
  }
}
