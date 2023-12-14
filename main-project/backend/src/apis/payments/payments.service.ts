import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PAYMENT_STATUS_ENUM, Payment } from './entities/payment.entity';
import { User } from '../users/entities/users.entity';
import {
  IPaymentnsServiceFindByImpUidAndUser,
  IPaymentsServiceCancel,
  IPaymentsServiceCheckAlreadyCanceled,
  IPaymentsServiceCheckDuplication,
  IPaymentsServiceCheckHasCancelablePoint,
  IPaymentsServiceCreate,
  IPaymentsServiceCreateForPayment,
  IPaymentsServiceFindOneByImpUid,
} from './interfaces/payments-service.interface';
import { IamportService } from '../iamport/iamport.service';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly dataSource: DataSource,
    private readonly iamportService: IamportService,
  ) {}

  findOneByImpUid({
    impUid,
  }: IPaymentsServiceFindOneByImpUid): Promise<Payment> {
    return this.paymentRepository.findOne({
      where: {
        impUid,
      },
    });
  }

  async checkDuplication({
    impUid,
  }: IPaymentsServiceCheckDuplication): Promise<void> {
    const result = await this.findOneByImpUid({ impUid });
    if (result) throw new ConflictException('이미 등록된 결제 아이디입니다.');
  }

  async create({
    impUid,
    amount,
    user: _user,
    status = PAYMENT_STATUS_ENUM.PAYMENT,
  }: IPaymentsServiceCreate): Promise<Payment> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');
    try {
      // 1. PointTransaction 테이블에 거래기록 1줄 생성
      const payment = this.paymentRepository.create({
        impUid,
        amount,
        user: _user,
        status,
      });
      await this.paymentRepository.save(payment);

      // 2. 유저의 돈 찾아오기
      const user = await this.userRepository.findOne({
        where: { id: _user.id },
      });

      // 3. 유저의 돈 업데이트
      await this.userRepository.update(
        { id: _user.id },
        { point: user.point + amount },
      );

      // 4. 최종결과 브라우저에 돌려주기
      return payment;
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      queryRunner.release();
    }
  }

  async createForPayment({
    impUid,
    amount,
    user,
  }: IPaymentsServiceCreateForPayment): Promise<Payment> {
    await this.iamportService.checkPaid({ impUid, amount });
    await this.checkDuplication({ impUid });
    return this.create({ impUid, amount, user });
  }

  findByImpUidAndUser({
    impUid,
    user,
  }: IPaymentnsServiceFindByImpUidAndUser): Promise<Payment[]> {
    return this.paymentRepository.find({
      where: { impUid, user: { id: user.id } },
      relations: ['user'],
    });
  }

  checkAlreadyCanceled({
    payments,
  }: IPaymentsServiceCheckAlreadyCanceled): void {
    const canceledPayments = payments.filter(
      (el) => el.status === PAYMENT_STATUS_ENUM.CANCEL,
    );
    if (canceledPayments.length)
      throw new ConflictException('이미 취소된 결제 아이디입니다.');
  }

  checkHasCancelablePoint({
    payments,
  }: IPaymentsServiceCheckHasCancelablePoint): void {
    const paidPayments = payments.filter(
      (el) => el.status === PAYMENT_STATUS_ENUM.PAYMENT,
    );
    if (!paidPayments.length)
      throw new UnprocessableEntityException('결제 기록이 존재하지 않습니다.');

    if (paidPayments[0].user.point < paidPayments[0].amount)
      throw new UnprocessableEntityException('포인트가 부족합니다.');
  }

  async cancel({ impUid, user }: IPaymentsServiceCancel): Promise<Payment> {
    const payments = await this.findByImpUidAndUser({ impUid, user }); // 결제 내역 조회하기
    this.checkAlreadyCanceled({ payments }); // 이미 취소된 uid 인지 검증
    this.checkHasCancelablePoint({ payments }); // 포인트가 취소하기에 충분히 있는지 검증하기

    // 결제 취소하기
    const canceledAmount = await this.iamportService.cancel({ impUid });

    // 취소된 결과 데이터베이스에 등록하기
    return this.create({
      impUid,
      amount: -canceledAmount,
      user,
      status: PAYMENT_STATUS_ENUM.CANCEL,
    });
  }
}
