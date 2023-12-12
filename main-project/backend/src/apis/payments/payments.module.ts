import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsResolver } from './payments.resolver';
import { PaymentsService } from './payments.service';
import { Payment } from './entities/payment.entity';
import { User } from '../users/entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Payment, //
      User,
    ]),
  ],
  providers: [
    PaymentsResolver, //
    PaymentsService,
  ],
})
export class PaymentsMoudle {}
