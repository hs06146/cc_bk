import {
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import { AxiosError } from 'axios';

@Catch() // 비워두면 http exception, axios error 등 모든 에러를 처리하게됨.
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: unknown) {
    // default 예외
    const error = {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: '예외가 발생했어요!',
    };

    if (exception instanceof HttpException) {
      // http 예외
      error.status = exception.getStatus();
      error.message = exception.message;
    } else if (exception instanceof AxiosError) {
      // axios 예외
      error.status = exception.response.status;
      error.message = exception.response.data.message;
    }

    throw new ApolloError(error.message, error.status.toString()); // Graphql 용 error로 바꿔치기
  }
}
