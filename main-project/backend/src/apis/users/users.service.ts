import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import {
  IUsersServiceCreate,
  IUsersServiceDelete,
  IUsersServiceFindOne,
  IUsersServiceUpdate,
  IUsersServiceUpdateUserPwd,
} from './interfaces/users-service.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, //
  ) {}

  async create({ user }: IUsersServiceCreate): Promise<User> {
    const { password, ...userInfo } = user;

    const existUser = await this.findOne({ email: userInfo.email });
    if (existUser) throw new ConflictException('이미 존재하는 이메일입니다.');

    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userRepository.save({
      password: hashedPassword,
      ...userInfo,
    });
  }

  async deleteLoginUser({ id }: IUsersServiceDelete): Promise<boolean> {
    const result = await this.userRepository.softDelete({ id });
    return result.affected ? true : false;
  }

  async update({ email, updateUserInput }: IUsersServiceUpdate): Promise<User> {
    const { ...newUpdateUserInput } = updateUserInput;
    const user = await this.findOne({ email });

    return this.userRepository.save({
      ...user,
      ...newUpdateUserInput,
    });
  }

  findOne({ email }: IUsersServiceFindOne): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async updateUserPwd({
    email,
    password,
  }: IUsersServiceUpdateUserPwd): Promise<User> {
    const user = await this.findOne({ email });
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userRepository.save({ ...user, password: hashedPassword });
  }
}
