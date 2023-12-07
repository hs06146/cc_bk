import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import {
  IUsersServiceCreate,
  IUsersServiceDelete,
  IUsersServiceFindOne,
  IUsersServiceFindOneByUserId,
  IUsersServiceUpdate,
  IUsersServiceUpdateUserPwd,
  IUsersServiceValidateNickname,
} from './interfaces/users-service.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, //
  ) {}

  findOneByUserId({ userId }: IUsersServiceFindOneByUserId): Promise<User> {
    return this.userRepository.findOne({ where: { userId } });
  }

  validateNickname({ nickname }: IUsersServiceValidateNickname): Promise<User> {
    return this.userRepository.findOne({ where: { nickname } });
  }

  async create({ user }: IUsersServiceCreate): Promise<User> {
    const { userId, password, nickname, ...userInfo } = user;

    const existUser = await this.findOneByUserId({ userId });
    if (existUser) throw new ConflictException('이미 존재하는 아이디입니다.');

    const existNickname = await this.validateNickname({ nickname });
    if (existNickname)
      throw new ConflictException('이미 존재하는 닉네임입니다.');

    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userRepository.save({
      userId,
      password: hashedPassword,
      nickname,
      ...userInfo,
    });
  }

  async deleteLoginUser({ id }: IUsersServiceDelete): Promise<boolean> {
    const result = await this.userRepository.softDelete({ id });
    return result.affected ? true : false;
  }

  async update({ id, updateUserInput }: IUsersServiceUpdate): Promise<User> {
    const { nickname, ...newUpdateUserInput } = updateUserInput;
    const user = await this.findOne({ id });
    const existNickname = await this.validateNickname({ nickname });
    if (existNickname)
      throw new ConflictException('이미 존재하는 닉네임입니다.');

    return this.userRepository.save({
      ...user,
      nickname,
      ...newUpdateUserInput,
    });
  }

  findOne({ id }: IUsersServiceFindOne): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async updateUserPwd({
    id,
    password,
  }: IUsersServiceUpdateUserPwd): Promise<User> {
    const user = await this.findOne({ id });
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userRepository.save({ ...user, password: hashedPassword });
  }
}
