import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import {
  POINT_TRANSACTION_STATUS_ENUM,
  Payment,
} from './entities/payment.entity';
import { User } from '../users/entities/users.entity';
import { IPaymentsServiceCreate } from './interfaces/payments-service.interface';
import axios from 'axios';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly dataSource: DataSource,
  ) {}

  async create({
    impUid,
    amount,
    user: _user,
  }: IPaymentsServiceCreate): Promise<Payment> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');
    try {
      const imp_getToken = await axios({
        url: 'https://api.iamport.kr/users/getToken',
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data: {
          imp_key: '4530824847164481',
          imp_secret:
            'Bs0ySw3fat3QDgXam73SNiCCkMk6gIog4z5bQJjApIdJwly4u8KsCMrvNcPvctbPKCBGgEL3DveT4TH2',
        },
      });
      const { access_token } = imp_getToken.data.response;

      // imp_uid로 인증 정보 조회
      const getCertifications = await axios({
        // imp_uid 전달
        url: `https://api.iamport.kr/payments/${impUid}`,
        // GET method
        method: 'get',
        // 인증 토큰 Authorization header에 추가
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
      });
      const certificationsInfo = getCertifications.data; // 조회한 인증 정보
      console.log(certificationsInfo);

      // 1. PointTransaction 테이블에 거래기록 1줄 생성
      const payment = this.paymentRepository.create({
        impUid,
        amount,
        user: _user,
        status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
      });
      await queryRunner.manager.save(payment);

      // 2. 유저의 돈 찾아서 업데이트하기 => 숫자일때만 가능 ==> lock을 걸지 않아도 됨.
      await queryRunner.manager.increment(
        User, // User 테이블에서
        { id: _user.id }, // id가 _user.id 인 row에
        'point', // point 라는 데이터를
        amount, // amount 만큼 증가시켜줘.
      );

      // 저장 내용 반영하기
      await queryRunner.commitTransaction();

      // 3. 최종 결과 브라우저에 돌려주기
      return payment;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      // 연결 끊기
      queryRunner.release();
    }
  }
}
