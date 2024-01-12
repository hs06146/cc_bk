import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import {
  POINT_TRANSACTION_STATUS_ENUM,
  PointTransaction,
} from './entities/pointTransaction.entity';
import { IPointsTransactionsServiceCreate } from './interfaces/points-transactions-service.interface';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PointsTransactionsService {
  constructor(
    @InjectRepository(PointTransaction)
    private readonly pointsTransactionsRepository: Repository<PointTransaction>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly dataSource: DataSource,
  ) {}

  async create({
    impUid,
    amount,
    user: _user,
  }: IPointsTransactionsServiceCreate): Promise<PointTransaction> {
    // this.pointsTransactionsRepository.create // 등록을 위한 빈 객체 만들기
    // this.pointsTransactionsRepository.insert // 결과는 못 받는 등록 방법
    // this.pointsTransactionsRepository.update // 결과는 못 받는 수정 방법

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');
    try {
      // 1. PointTransaction 테이블에 거래기록 1줄 생성
      const pointTransaction = this.pointsTransactionsRepository.create({
        impUid,
        amount,
        user: _user,
        status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
      });
      // await this.pointsTransactionsRepository.save(pointTransaction);
      await queryRunner.manager.save(pointTransaction);

      // 2. 유저의 돈 찾아오기
      // const user = await this.usersRepository.findOne({
      //   where: { id: _user.id },
      // });
      const user = await queryRunner.manager.findOne(User, {
        where: { id: _user.id }, // row-lock
        lock: { mode: 'pessimistic_write' }, // 돈이 업데이트 되는 과정(계산 중)에 다른 사람이 조회를 하면 계산이 꼬여버림.
      });

      // 3. 유저의 돈 업데이트
      const updatedUser = this.usersRepository.create({
        ...user, // 여기에 id 값이 있으면 update로 동작함.
        point: user.point + amount,
      });
      await queryRunner.manager.save(updatedUser);

      // 저장 내용 반영하기
      await queryRunner.commitTransaction();

      // 4. 최종 결과 브라우저에 돌려주기
      return pointTransaction;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      // 연결 끊기
      queryRunner.release();
      // Database의 max_connection 갯수는 한정되어있음.
      // release 를 하지 않으면 commit이 끝나도 커넥션이 안끊겨서 db_connection status가 sleep 상태로 됨. (하지만, 에러나면 강제로 끊김)
      // 결국 연결 갯수 초과로 그 다음 사람은 무한 대기 상태가 됨.
    }
  }
}
