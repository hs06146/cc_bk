import { IAuthUser } from 'src/commons/interfaces/context';
import { PAYMENT_STATUS_ENUM, Payment } from '../entities/payment.entity';

export interface IPaymentsServiceCreate {
  impUid: string;
  amount: number;
  user: IAuthUser['user'];
  status?: PAYMENT_STATUS_ENUM;
}

export interface IPaymentsServiceCreateForPayment {
  impUid: string;
  amount: number;
  user: IAuthUser['user'];
}

export class IPaymentsServiceFindOneByImpUid {
  impUid: string;
}

export class IPaymentsServiceCheckDuplication {
  impUid: string;
}

export class IPaymentsServiceCheckAlreadyCanceled {
  payments: Payment[];
}

export class IPaymentsServiceCheckHasCancelablePoint {
  payments: Payment[];
}

export class IPaymentnsServiceFindByImpUidAndUser {
  impUid: string;
  user: IAuthUser['user'];
}

export class IPaymentsServiceCancel {
  impUid: string;
  user: IAuthUser['user'];
}
