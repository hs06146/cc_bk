import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';

export interface IUsersServiceCreate {
  user: CreateUserInput;
}

export interface IUsersServiceDelete {
  id: string;
}

export interface IUsersServiceUpdate {
  email: string;
  updateUserInput: UpdateUserInput;
}

export interface IUsersServiceFindOne {
  email: string;
}

export interface IUsersServiceUpdateUserPwd {
  email: string;
  password: string;
}
