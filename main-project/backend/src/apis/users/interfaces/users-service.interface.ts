import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';

export interface IUsersServiceCreate {
  user: CreateUserInput;
}

export interface IUsersServiceValidateNickname {
  nickname: string;
}

export interface IUsersServiceFindOneByUserId {
  userId: string;
}

export interface IUsersServiceDelete {
  id: string;
}

export interface IUsersServiceUpdate {
  id: string;
  updateUserInput: UpdateUserInput;
}

export interface IUsersServiceFindOne {
  id: string;
}

export interface IUsersServiceUpdateUserPwd {
  id: string;
  password: string;
}
