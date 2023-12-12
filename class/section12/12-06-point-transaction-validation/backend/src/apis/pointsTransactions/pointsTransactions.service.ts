import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import {
  PointTransaction,
  POINT_TRANSACTION_STATUS_ENUM,
} from './entities/pointTransaction.entity';
import {
  IPointsTransactionServiceCheckDuplication,
  IPointsTransactionServiceFindOneByImpUid,
  IPointsTransactionsServiceCreate,
} from './interfaces/points-transactions-service.interface';
import { IamportService } from '../iamport/iamport.service';

@Injectable()
export class PointsTransactionsService {
  constructor(
    @InjectRepository(PointTransaction)
    private readonly pointsTransactionsRepository: Repository<PointTransaction>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly iamportService: IamportService,
  ) {}

  findOneByImpUid({
    impUid,
  }: IPointsTransactionServiceFindOneByImpUid): Promise<PointTransaction> {
    return this.pointsTransactionsRepository.findOne({
      where: {
        impUid,
      },
    });
  }

  async checkDuplication({
    impUid,
  }: IPointsTransactionServiceCheckDuplication): Promise<void> {
    const result = await this.findOneByImpUid({ impUid });
    if (result) throw new ConflictException('이미 등록된 결제 아이디입니다.');
  }

  async create({
    impUid,
    amount,
    user: _user,
  }: IPointsTransactionsServiceCreate): Promise<PointTransaction> {
    await this.iamportService.checkPaid({ impUid, amount }); // 결제 완료 상태인지 검증하기

    await this.checkDuplication({ impUid }); // 이미 결제됐던 id인지 검증하기

    // 1. PointTransaction 테이블에 거래기록 1줄 생성
    const pointTransaction = this.pointsTransactionsRepository.create({
      impUid,
      amount,
      user: _user,
      status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
    });
    await this.pointsTransactionsRepository.save(pointTransaction);

    // 2. 유저의 돈 찾아오기
    const user = await this.usersRepository.findOne({
      where: { id: _user.id },
    });

    // 3. 유저의 돈 업데이트
    await this.usersRepository.update(
      { id: _user.id },
      { point: user.point + amount },
    );

    // 4. 최종결과 브라우저에 돌려주기
    return pointTransaction;
  }
}
