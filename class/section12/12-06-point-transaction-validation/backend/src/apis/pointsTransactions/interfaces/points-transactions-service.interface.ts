import { IAuthUser } from 'src/commons/interfaces/context';

export interface IPointsTransactionServiceFindOneByImpUid {
  impUid: string;
}

export interface IPointsTransactionServiceCheckDuplication {
  impUid: string;
}

export interface IPointsTransactionsServiceCreate {
  impUid: string;
  amount: number;
  user: IAuthUser['user'];
}
