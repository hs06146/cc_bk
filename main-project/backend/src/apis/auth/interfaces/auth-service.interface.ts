import { User } from 'src/apis/users/entities/users.entity';
import { IAuthUser, IContext } from 'src/commons/interfaces/context';

export interface IAuthServiceGetAccessToken {
  user: User | IAuthUser['user'];
}

export interface IAuthServiceLogin {
  userId: string;
  password: string;
  context: IContext;
}

export interface IAuthServiceSetRefreshToken {
  user: User;
  context: IContext;
}

export interface IAuthServiceRestoreAccessToken {
  user: IAuthUser['user'];
}
