import { IAuthUser } from 'src/commons/interfaces/context';

export interface IPaymentsServiceCreate {
  impUid: string;
  amount: number;
  user: IAuthUser['user'];
}
