import { Injectable } from '@nestjs/common';
import { IStarbucksServiceCreate } from './interfaces/starbucks-service.interface';
import { CreateStarbucksInput } from './dto/starbucks.input';
import { Starbucks } from './entities/starbucks.entity';

@Injectable()
export class StarbucksService {
  findAll(): Starbucks[] {
    const result = [
      {
        id: 1,
        menu: '아메리카노',
        price: 4500,
        kcal: 5,
        saturated_fat: 0,
        protein: 0,
        salt: 0,
        sugar: 0,
        caffeine: 75,
      },
      {
        id: 2,
        menu: '카페라떼',
        price: 5000,
        kcal: 110,
        saturated_fat: 4,
        protein: 6,
        salt: 70,
        sugar: 8,
        caffeine: 75,
      },
      {
        id: 3,
        menu: '아메리카노2',
        price: 4500,
        kcal: 5,
        saturated_fat: 0,
        protein: 0,
        salt: 0,
        sugar: 0,
        caffeine: 75,
      },
      {
        id: 4,
        menu: '카페라떼2',
        price: 5000,
        kcal: 110,
        saturated_fat: 4,
        protein: 6,
        salt: 70,
        sugar: 8,
        caffeine: 75,
      },
      {
        id: 5,
        menu: '아메리카노3',
        price: 4500,
        kcal: 5,
        saturated_fat: 0,
        protein: 0,
        salt: 0,
        sugar: 0,
        caffeine: 75,
      },
    ];
    return result;
  }

  create({ createStarbucksInput }: IStarbucksServiceCreate): string {
    console.log(createStarbucksInput);

    return '등록에 성공하였습니다.';
  }
}
